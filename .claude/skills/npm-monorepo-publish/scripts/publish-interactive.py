#!/usr/bin/env python3
"""
Interactive npm monorepo publisher with OTP handling and mandatory release branch workflow.

Usage:
    python3 publish-interactive.py [--dry-run]

The release branch workflow is mandatory as of v1.0.0. All publishes create a
release branch, publish from it, and merge back to main/master.
"""

import subprocess
import sys
import re
import datetime
from pathlib import Path

def run_command(cmd, capture=True):
    """Run shell command and return output."""
    try:
        if capture:
            result = subprocess.run(
                cmd, shell=True, check=True,
                capture_output=True, text=True
            )
            return result.stdout.strip()
        else:
            subprocess.run(cmd, shell=True, check=True)
            return None
    except subprocess.CalledProcessError as e:
        print(f"❌ Command failed: {cmd}")
        print(f"Error: {e.stderr if e.stderr else e}")
        sys.exit(1)

def detect_git_branches():
    """Detect current and default branches.

    Returns:
        tuple: (current_branch, default_branch)
    """
    try:
        # Get current branch
        current_branch = subprocess.run(
            "git rev-parse --abbrev-ref HEAD",
            shell=True, check=True, capture_output=True, text=True
        ).stdout.strip()

        # Try to auto-detect default branch from origin/HEAD
        try:
            default_branch = subprocess.run(
                "git symbolic-ref refs/remotes/origin/HEAD",
                shell=True, check=True, capture_output=True, text=True
            ).stdout.strip().replace("refs/remotes/origin/", "")
        except subprocess.CalledProcessError:
            # Fallback: try main, then master
            default_branch = None
            for branch in ["main", "master"]:
                try:
                    subprocess.run(
                        f"git rev-parse --verify {branch}",
                        shell=True, check=True, capture_output=True, text=True
                    )
                    default_branch = branch
                    break
                except subprocess.CalledProcessError:
                    continue

            if not default_branch:
                print("⚠️  Could not detect default branch. Using 'main'.")
                default_branch = "main"

        return current_branch, default_branch

    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to detect git branches: {e}")
        sys.exit(1)

def validate_git_state(current_branch):
    """Validate git working directory state.

    Args:
        current_branch: Name of the current git branch
    """
    # Check for uncommitted changes
    try:
        subprocess.run(
            "git diff-index --quiet HEAD",
            shell=True, check=True, capture_output=True
        )
    except subprocess.CalledProcessError:
        print("❌ Working directory not clean. Commit or stash changes first.")
        sys.exit(1)

    # Check not already on release branch
    if current_branch.startswith("release/"):
        print("❌ Already on a release branch. Switch to main/master first.")
        print(f"   Current branch: {current_branch}")
        print(f"   To switch: git checkout main")
        sys.exit(1)

    # Check up to date with remote (warning only, not blocker)
    try:
        subprocess.run(
            f"git fetch origin {current_branch}",
            shell=True, check=True, capture_output=True
        )
        local = subprocess.run(
            "git rev-parse @",
            shell=True, check=True, capture_output=True, text=True
        ).stdout.strip()
        remote = subprocess.run(
            "git rev-parse @{u}",
            shell=True, check=True, capture_output=True, text=True
        ).stdout.strip()

        if local != remote:
            print("⚠️  Warning: Branch not up to date with remote. Consider pulling latest changes.")
    except subprocess.CalledProcessError:
        # No remote tracking or other issue - warn but continue
        print("⚠️  Warning: Could not verify remote status (no upstream branch?).")

def extract_version_from_dry_run(output):
    """Parse version from Lerna dry-run output.

    Args:
        output: Lerna dry-run command output

    Returns:
        str: Version string for branch naming (e.g., "0.6.2" or "multi-20260106-143052")
    """
    # Parse lines like: " - @fpkit/acss: 0.6.1 => 0.6.2"
    pattern = r'-\s+(@?[\w/-]+):\s+([\d.]+(?:-[\w.]+)?)\s+=>\s+([\d.]+(?:-[\w.]+)?)'
    matches = re.findall(pattern, output)

    if not matches:
        # No version changes detected, use timestamp
        print("⚠️  Could not extract version from dry-run output, using timestamp")
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        return f"multi-{timestamp}"

    # Single package: use its target version
    if len(matches) == 1:
        return matches[0][2]  # Target version (third group)

    # Multiple packages: use timestamp
    timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    return f"multi-{timestamp}"

def create_release_branch(branch_name):
    """Create and checkout release branch.

    Args:
        branch_name: Name for the release branch

    Returns:
        bool: True if successful, False otherwise
    """
    try:
        subprocess.run(
            f"git checkout -b {branch_name}",
            shell=True, check=True, capture_output=True, text=True
        )
        print(f"✅ Created release branch: {branch_name}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create release branch: {e}")
        if e.stderr:
            print(f"   Error: {e.stderr.strip()}")
        return False

def merge_and_cleanup(release_branch, default_branch, release_version):
    """Merge release branch back to default and cleanup.

    Args:
        release_branch: Name of the release branch
        default_branch: Name of the default branch (main/master)
        release_version: Version identifier for commit message
    """
    try:
        # Checkout default branch
        print(f"Checking out {default_branch}...")
        subprocess.run(
            f"git checkout {default_branch}",
            shell=True, check=True, capture_output=True, text=True
        )

        # Merge release branch with no-ff (create merge commit)
        merge_msg = f"chore: merge release {release_version}"
        print(f"Merging {release_branch} into {default_branch}...")
        subprocess.run(
            f"git merge {release_branch} --no-ff -m '{merge_msg}'",
            shell=True, check=True, capture_output=True, text=True
        )

        # Push merged changes and tags to remote
        print(f"Pushing to origin {default_branch}...")
        subprocess.run(
            f"git push origin {default_branch} --follow-tags",
            shell=True, check=True, capture_output=True, text=True
        )

        print(f"✅ Merged {release_branch} into {default_branch}")

    except subprocess.CalledProcessError as e:
        print(f"❌ Merge failed: {e}")
        if e.stderr:
            print(f"   Error: {e.stderr.strip()}")
        print(f"\n⚠️  Release branch '{release_branch}' preserved for manual intervention")
        print(f"\nTo complete manually:")
        print(f"  git checkout {default_branch}")
        print(f"  git merge {release_branch}")
        print(f"  git push origin {default_branch} --follow-tags")
        raise  # Re-raise to signal failure to caller

    # Cleanup local branch (non-critical, don't fail on error)
    try:
        subprocess.run(
            f"git branch -d {release_branch}",
            shell=True, check=True, capture_output=True, text=True
        )
        print(f"✅ Deleted local branch: {release_branch}")
    except subprocess.CalledProcessError:
        print(f"⚠️  Could not delete local branch: {release_branch}")

    # Note: Remote release branch is preserved (not deleted) per user preference

def offer_branch_cleanup(release_branch, original_branch):
    """Offer to cleanup release branch after publish failure.

    Args:
        release_branch: Name of the release branch to clean up
        original_branch: Name of the original branch to return to
    """
    print(f"\n⚠️  Publish failed. Release branch '{release_branch}' was created.")
    cleanup = input("Delete release branch and return to original? (yes/no): ").strip().lower()

    if cleanup in ['yes', 'y']:
        try:
            # Checkout original branch
            subprocess.run(
                f"git checkout {original_branch}",
                shell=True, check=True, capture_output=True, text=True
            )
            # Force delete release branch (may have uncommitted work)
            subprocess.run(
                f"git branch -D {release_branch}",
                shell=True, check=True, capture_output=True, text=True
            )
            print(f"✅ Cleaned up release branch: {release_branch}")
        except subprocess.CalledProcessError as e:
            print(f"❌ Cleanup failed: {e}")
            print(f"To clean up manually:")
            print(f"  git checkout {original_branch}")
            print(f"  git branch -D {release_branch}")
    else:
        print(f"Release branch '{release_branch}' preserved for investigation.")

def validate_otp(otp):
    """Validate OTP format (6 digits)."""
    return bool(re.match(r'^\d{6}$', otp))

def main():
    """Main publishing workflow with mandatory release branch support."""
    dry_run = '--dry-run' in sys.argv

    # Deprecation warning for users attempting to use old flag
    if '--no-release-branch' in sys.argv:
        print("⚠️  WARNING: --no-release-branch flag is deprecated and ignored in v1.0.0+")
        print("⚠️  Release branch workflow is now mandatory for all publishes.")
        print()

    print("🚀 NPM Monorepo Publisher")
    print("=" * 50)

    # Variables for release branch workflow
    current_branch = None
    default_branch = None
    release_version = None
    release_branch_name = None

    # Step 1: Pre-flight checks
    print("\n📋 Step 1: Pre-flight validation")
    print("-" * 50)

    script_dir = Path(__file__).parent
    preflight_script = script_dir / "pre-flight-check.sh"

    if preflight_script.exists():
        run_command(f"bash {preflight_script}", capture=False)
    else:
        print("⚠️  pre-flight-check.sh not found, skipping validation")

    # Step 2: Git state validation
    print("\n🌿 Step 2: Git state validation")
    print("-" * 50)
    current_branch, default_branch = detect_git_branches()
    print(f"Current branch: {current_branch}")
    print(f"Default branch: {default_branch}")
    validate_git_state(current_branch)
    print("✅ Git state validated")

    # Step 3: Dry-run preview
    print("\n🔍 Step 3: Dry-run preview")
    print("-" * 50)
    print("Analyzing changed packages...")

    dry_run_cmd = "lerna publish --no-git-tag-version --no-push --yes"
    output = run_command(dry_run_cmd)
    print(output)

    # Extract version for release branch naming
    release_version = extract_version_from_dry_run(output)
    release_branch_name = f"release/v{release_version}"
    print(f"\nRelease branch: {release_branch_name}")

    if dry_run:
        print("\n✅ Dry-run complete. Use without --dry-run to publish.")
        sys.exit(0)

    # Step 4: Confirm publish
    print("\n❓ Step 4: Confirm publish")
    print("-" * 50)
    confirm = input("Proceed with publish? (yes/no): ").strip().lower()

    if confirm not in ['yes', 'y']:
        print("❌ Publish cancelled.")
        sys.exit(0)

    # Step 5: Create release branch
    print("\n🌿 Step 5: Create release branch")
    print("-" * 50)
    if not create_release_branch(release_branch_name):
        sys.exit(1)

    # Step 6: OTP prompt and publish
    print("\n🔐 Step 6: OTP authentication")
    print("-" * 50)

    publish_success = False
    max_retries = 3
    for attempt in range(1, max_retries + 1):
        otp = input(f"Enter 6-digit OTP code (attempt {attempt}/{max_retries}): ").strip()

        if not validate_otp(otp):
            print("❌ Invalid OTP format. Must be exactly 6 digits.")
            continue

        print(f"\n📦 Publishing with OTP: {otp}")

        try:
            run_command(f"lerna publish --otp {otp}", capture=False)
            print("\n✅ Successfully published!")
            publish_success = True
            break
        except subprocess.CalledProcessError as e:
            if "invalid" in str(e).lower() or "expired" in str(e).lower():
                print(f"❌ OTP expired or invalid. {max_retries - attempt} attempts remaining.")
                if attempt == max_retries:
                    print("❌ Max retries reached. Please try again later.")
            else:
                print(f"❌ Publish failed: {e}")

    if not publish_success:
        offer_branch_cleanup(release_branch_name, current_branch)
        sys.exit(1)

    # Step 7: Merge and cleanup
    print("\n🔀 Step 7: Merge and cleanup")
    print("-" * 50)
    try:
        merge_and_cleanup(release_branch_name, default_branch, release_version)
    except subprocess.CalledProcessError:
        # Error already handled in merge_and_cleanup, just exit
        sys.exit(1)

    # Step 8: Post-publish verification
    print("\n✅ Step 8: Post-publish verification")
    print("-" * 50)
    print("To verify published packages:")
    print("  npm view @your-scope/package version")
    print("  npm view @your-scope/package time")

if __name__ == "__main__":
    main()
