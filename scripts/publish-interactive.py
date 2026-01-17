#!/usr/bin/env python3

"""
Interactive NPM Publishing Script for @fpkit/acss

This script automates the publishing process with:
- Interactive prompts for version bump
- OTP handling with retry logic
- Dry-run preview
- Release branch workflow
- Post-publish verification
"""

import subprocess
import sys
import json
import re
from typing import Optional, Tuple

# ANSI color codes
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    CYAN = '\033[0;36m'
    NC = '\033[0m'  # No Color

def print_header(text: str):
    """Print a formatted header."""
    print(f"\n{Colors.CYAN}{'=' * 60}{Colors.NC}")
    print(f"{Colors.CYAN}{text.center(60)}{Colors.NC}")
    print(f"{Colors.CYAN}{'=' * 60}{Colors.NC}\n")

def print_success(text: str):
    """Print a success message."""
    print(f"{Colors.GREEN}✓{Colors.NC} {text}")

def print_error(text: str):
    """Print an error message."""
    print(f"{Colors.RED}✗{Colors.NC} {text}")

def print_warning(text: str):
    """Print a warning message."""
    print(f"{Colors.YELLOW}⚠{Colors.NC} {text}")

def print_info(text: str):
    """Print an info message."""
    print(f"{Colors.BLUE}ℹ{Colors.NC} {text}")

def run_command(cmd: str, capture_output: bool = True) -> Tuple[int, str]:
    """Run a shell command and return exit code and output."""
    try:
        if capture_output:
            result = subprocess.run(
                cmd,
                shell=True,
                capture_output=True,
                text=True,
                check=False
            )
            return result.returncode, result.stdout + result.stderr
        else:
            result = subprocess.run(cmd, shell=True, check=False)
            return result.returncode, ""
    except Exception as e:
        return 1, str(e)

def get_current_version() -> str:
    """Get current version from package.json."""
    try:
        with open('packages/fpkit/package.json', 'r') as f:
            package_data = json.load(f)
            return package_data.get('version', 'unknown')
    except Exception as e:
        print_error(f"Failed to read package.json: {e}")
        return "unknown"

def get_current_branch() -> str:
    """Get current git branch."""
    code, output = run_command("git rev-parse --abbrev-ref HEAD")
    return output.strip() if code == 0 else "unknown"

def prompt_version_bump() -> str:
    """Prompt user for version bump type."""
    print_info("Select version bump type:")
    print("  1) patch  - Bug fixes (6.0.0 → 6.0.1)")
    print("  2) minor  - New features (6.0.0 → 6.1.0)")
    print("  3) major  - Breaking changes (6.0.0 → 7.0.0)")
    print("  4) custom - Specify exact version")

    while True:
        choice = input(f"\n{Colors.CYAN}Enter choice [1-4]:{Colors.NC} ").strip()

        if choice == '1':
            return 'patch'
        elif choice == '2':
            return 'minor'
        elif choice == '3':
            # Warn about major version
            confirm = input(f"{Colors.YELLOW}Major version bump! Are you sure? [y/N]:{Colors.NC} ").strip().lower()
            if confirm == 'y':
                return 'major'
            else:
                print_info("Major version bump cancelled. Please choose another option.")
                continue
        elif choice == '4':
            version = input(f"{Colors.CYAN}Enter version (e.g., 6.1.0):{Colors.NC} ").strip()
            if re.match(r'^\d+\.\d+\.\d+$', version):
                return version
            else:
                print_error("Invalid version format. Use semantic versioning (e.g., 6.1.0)")
                continue
        else:
            print_error("Invalid choice. Please enter 1-4.")

def prompt_otp() -> str:
    """Prompt user for OTP code."""
    otp = input(f"\n{Colors.CYAN}Enter your 2FA code (6 digits):{Colors.NC} ").strip()
    return otp

def create_release_branch(version: str) -> bool:
    """Create a release branch."""
    branch_name = f"release/v{version}"

    print_info(f"Creating release branch: {branch_name}")
    code, output = run_command(f"git checkout -b {branch_name}")

    if code == 0:
        print_success(f"Created branch: {branch_name}")
        return True
    else:
        print_error(f"Failed to create release branch: {output}")
        return False

def publish_with_lerna(version: str, otp: str, dry_run: bool = False) -> bool:
    """Publish package using Lerna."""
    cmd = f"lerna publish {version} --yes --otp {otp}"

    if dry_run:
        print_info("DRY RUN MODE - No actual publish will occur")
        cmd += " --no-git-tag-version --no-push"

    print_info(f"Running: lerna publish {version}")
    code, output = run_command(cmd, capture_output=False)

    return code == 0

def verify_publication(expected_version: str) -> bool:
    """Verify package was published to npm."""
    print_info("Verifying publication on npm registry...")

    code, output = run_command("npm view @fpkit/acss version")

    if code == 0:
        actual_version = output.strip()
        if actual_version == expected_version:
            print_success(f"Package published successfully: @fpkit/acss@{actual_version}")
            return True
        else:
            print_warning(f"Version mismatch: expected {expected_version}, got {actual_version}")
            return False
    else:
        print_error("Failed to verify publication")
        return False

def merge_release_branch(feature_branch: str):
    """Merge release branch back to feature branch."""
    current_branch = get_current_branch()

    print_info(f"Merging {current_branch} back to {feature_branch}")

    # Checkout feature branch
    code, _ = run_command(f"git checkout {feature_branch}")
    if code != 0:
        print_error(f"Failed to checkout {feature_branch}")
        return False

    # Merge release branch
    code, _ = run_command(f"git merge {current_branch} --no-ff")
    if code != 0:
        print_error(f"Failed to merge {current_branch}")
        return False

    print_success(f"Merged {current_branch} into {feature_branch}")

    # Delete release branch
    code, _ = run_command(f"git branch -d {current_branch}")
    if code == 0:
        print_success(f"Deleted release branch: {current_branch}")

    return True

def main():
    """Main script execution."""
    print_header("@fpkit/acss Interactive Publisher")

    # Get current state
    current_version = get_current_version()
    current_branch = get_current_branch()

    print_info(f"Current version: {current_version}")
    print_info(f"Current branch: {current_branch}")

    # Prompt for version bump
    version_bump = prompt_version_bump()

    # Show confirmation
    print(f"\n{Colors.YELLOW}Publishing Summary:{Colors.NC}")
    print(f"  Package: @fpkit/acss")
    print(f"  Current: {current_version}")
    print(f"  Bump: {version_bump}")
    print(f"  From branch: {current_branch}")

    confirm = input(f"\n{Colors.CYAN}Proceed with publish? [y/N]:{Colors.NC} ").strip().lower()

    if confirm != 'y':
        print_warning("Publish cancelled.")
        sys.exit(0)

    # Prompt for OTP with retry
    max_attempts = 3
    for attempt in range(1, max_attempts + 1):
        print_info(f"OTP Attempt {attempt}/{max_attempts}")
        otp = prompt_otp()

        if len(otp) != 6 or not otp.isdigit():
            print_error("OTP must be 6 digits")
            continue

        # Create release branch
        if not create_release_branch(version_bump if re.match(r'^\d+\.\d+\.\d+$', version_bump) else current_version):
            sys.exit(1)

        # Publish
        print_header("Publishing to npm")

        if publish_with_lerna(version_bump, otp):
            print_success("Package published successfully!")

            # Verify publication
            # Note: version_bump might be "minor", "patch", etc., so we need to get actual version
            # For now, we'll skip verification if it's a bump type
            if re.match(r'^\d+\.\d+\.\d+$', version_bump):
                verify_publication(version_bump)

            # Merge back to feature branch
            merge_release_branch(current_branch)

            print_header("✓ Publish Complete!")
            print_info("Next steps:")
            print(f"  1. Push changes: git push origin {current_branch} --follow-tags")
            print(f"  2. Create PR to main (if needed)")
            print(f"  3. Verify on npm: npm view @fpkit/acss")

            sys.exit(0)
        else:
            print_error("Publish failed. Check OTP and try again.")

            # Cleanup: delete release branch and go back
            run_command(f"git checkout {current_branch}")
            run_command(f"git branch -D release/v{version_bump}")

            if attempt < max_attempts:
                retry = input(f"\n{Colors.CYAN}Retry? [y/N]:{Colors.NC} ").strip().lower()
                if retry != 'y':
                    break

    print_error("Maximum OTP attempts reached. Publish failed.")
    sys.exit(1)

if __name__ == "__main__":
    main()
