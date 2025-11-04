# CSS Variable Naming Convention Design

## Context

The @fpkit/acss library has grown organically to include 18 components with over 200 CSS custom properties. An audit revealed significant inconsistencies:

### Current State Analysis

**Components with Excellent Patterns:**
- **Alert**: `--alert-error-bg`, `--alert-error-border`, `--alert-error-color` (consistent variant structure)
- **List**: `--list-item-padding`, `--list-marker-color` (clear element scoping)
- **Link**: `--link-focus-outline`, `--link-hover-color` (predictable state variables)

**Components with Problematic Patterns:**
- **Button**: `--btn-fs`, `--btn-rds`, `--btn-cl`, `--btn-dsp`, `--btn-px`, `--btn-py` (heavy abbreviations)
- **Nav**: `--nav-dsp`, `--nav-hov-bg`, `--nav-mb` (inconsistent abbreviations)
- **Card**: `--card-p` (should be `--card-padding`)
- **Form**: `--input-px`, `--input-py`, `--input-w` (mixed abbreviation styles)

**Key Findings:**
- 60% of components use abbreviated property names inconsistently
- Width/height alternate between `--w`/`--h` and `--width`/`--height`
- Padding uses `--p`, `--px`, `--py`, `--padding`, and `--padding-inline` interchangeably
- No consistent pattern for variants (some use `--component-variant-property`, others use `--component-property-variant`)

### Constraints

1. **Balance brevity with clarity** - Variables shouldn't be overly verbose, but must be understandable
2. **Support IDE autocomplete** - Typing `--btn-` should reveal related variables in a logical order
3. **Maintain CSS best practices** - Follow established CSS custom property conventions
4. **Enable easy migration** - Pattern must be simple enough for find-and-replace operations
5. **Future-proof** - Must accommodate new components and property types

### Stakeholders

- **Library Users**: Need predictable, discoverable customization variables
- **Component Developers**: Need clear guidelines for adding/modifying components
- **Maintainers**: Need consistency for easier code reviews and refactoring
- **Documentation Writers**: Need standardized patterns to document effectively

## Goals / Non-Goals

### Goals

1. **Establish a single, authoritative naming pattern** for all CSS custom properties
2. **Define approved abbreviations** that balance brevity and clarity
3. **Organize variables** by component, element, variant, and state in a predictable hierarchy
4. **Enable better IDE tooling** through consistent prefixes and structure
5. **Reduce cognitive load** for users learning the library
6. **Provide clear migration paths** from current inconsistent names

### Non-Goals

1. **Implementing the changes** - This proposal documents the standard only
2. **Refactoring all components immediately** - Implementation will be phased
3. **Removing all abbreviations** - Some well-known abbreviations (bg, fs) are acceptable
4. **Breaking compatibility** in this proposal - No code changes yet
5. **Standardizing non-CSS aspects** - Focus only on CSS variable naming, not class names or other conventions

## Decisions

### Decision 1: Variable Pattern Structure

**Chosen Pattern:**
```
--{component}-{element}-{variant}-{property}-{modifier}
```

**Examples:**
```scss
--btn-bg                        // Base property
--btn-primary-bg                // Variant property
--btn-hover-bg                  // State property
--card-header-padding           // Element-specific property
--alert-error-border            // Variant with specific property
--btn-focus-outline-offset      // State with modified property
```

**Hierarchy Order:**
1. **Component** (required) - `btn`, `alert`, `card`, `nav`, etc.
2. **Element** (optional) - `header`, `footer`, `title`, `content`
3. **Variant** (optional) - `primary`, `secondary`, `error`, `success`
4. **Property** (required) - `bg`, `color`, `padding`, `border`
5. **Modifier** (optional) - `offset`, `width`, `style`, `radius`

**Rationale:**

| Alternative Considered | Why Rejected |
|---|---|
| `--{property}-{component}-{variant}` (property-first) | Breaks IDE autocomplete by component. Users want to type `--btn-` and see all button properties |
| `--{component}-{property}-{variant}` (variant last) | Less intuitive for discovering variants. Typing `--btn-primary-` shows all primary button properties, which is the desired UX |
| Flat structure with no hierarchy | Doesn't scale as components get more complex (e.g., card headers, alert icons) |

**IDE Autocomplete Benefits:**
- Type `--btn-` → See all button properties
- Type `--btn-primary-` → See all primary variant properties
- Type `--btn-hover-` → See all hover state properties
- Type `--card-header-` → See all card header properties

### Decision 2: Approved Abbreviations

**Abbreviated Terms (Widely Recognized):**

| Abbreviation | Full Name | Rationale |
|---|---|---|
| `bg` | background / background-color | Universal CSS convention, extremely common |
| `fs` | font-size | Well-established in typography systems |
| `fw` | font-weight | Common in typography systems |
| `radius` | border-radius | Short enough, clearer than `bdr-rds` |
| `gap` | gap | Already one word, no abbreviation needed |

**Full Words Required:**

| Property | ❌ Don't Use | ✅ Use | Rationale |
|---|---|---|---|
| padding | `p`, `px`, `py` | `padding`, `padding-inline`, `padding-block` | Logical properties are new, need clarity |
| margin | `m`, `mx`, `my`, `mb` | `margin`, `margin-inline`, `margin-block` | Logical properties are new, need clarity |
| color | `cl`, `c` | `color` | Too ambiguous when abbreviated |
| border | `bdr`, `br` | `border` | Avoid confusion with `border-radius` |
| display | `dsp`, `d` | `display` | Not universally recognized abbreviation |
| width | `w` | `width` | Single-letter abbreviations reduce clarity |
| height | `h` | `height` | Single-letter abbreviations reduce clarity |
| min-width | `min-w` | `min-width` | Consistency with `width` |
| max-height | `max-h` | `max-height` | Consistency with `height` |

**Rationale for Selective Abbreviation:**
- Properties abbreviated for **decades** in CSS communities (like `bg`) are safe
- **Logical properties** (`padding-inline`, `margin-block`) are too new to abbreviate without confusion
- **Single-letter** abbreviations (`w`, `h`, `p`) are ambiguous and harm readability
- **Multi-letter** abbreviations (`dsp`, `cl`) aren't universally recognized

**Alternatives Considered:**
1. **Full spelling everything** - Rejected as overly verbose (`--button-background-color`)
2. **Abbreviate everything** - Rejected as cryptic (`--btn-bdr-rds`, `--btn-cl`)
3. **User-configurable** - Rejected as it breaks consistency

### Decision 3: Variant Organization

**Chosen Pattern:** `--{component}-{variant}-{property}`

```scss
// Semantic variants (UI states)
--alert-error-bg
--alert-error-border
--alert-error-color

--alert-warning-bg
--alert-warning-border

// Style variants (visual themes)
--btn-primary-bg
--btn-primary-color

--btn-secondary-bg
--btn-secondary-border
```

**Why variant comes before property:**
- **Discoverability**: Typing `--alert-error-` shows all error-related properties
- **Grouping**: Related variant properties appear together in autocomplete
- **Matches user mental model**: "I want to change the error alert" → `--alert-error-*`

**Alternative Considered:** `--{component}-{property}-{variant}`
```scss
// Example: --alert-bg-error
--alert-bg-error
--alert-bg-warning
--alert-border-error
--alert-border-warning
```

**Why Rejected:**
- Groups by property type (all backgrounds together) rather than by variant
- Less intuitive for theming ("change error styles" vs "change all backgrounds")
- Doesn't match how users think about customization

### Decision 4: State Variables

**Pattern:** `--{component}-{state}-{property}`

```scss
--btn-hover-bg
--btn-hover-transform
--btn-hover-filter

--btn-focus-outline
--btn-focus-outline-offset
--btn-focus-color

--btn-disabled-opacity
--btn-disabled-cursor

--link-visited-color
--link-active-color
```

**Common States:**
- `hover` - Mouse hover state
- `focus` - Keyboard focus state
- `active` - Active/pressed state
- `disabled` - Disabled state
- `visited` - Visited link state (links only)
- `checked` - Checked state (checkboxes, radios)

**Rationale:**
- States follow the same pattern as variants for consistency
- Easy to discover all hover properties: `--btn-hover-*`
- Aligns with pseudo-class naming in CSS (`:hover`, `:focus`, `:disabled`)

### Decision 5: Element-Specific Variables

**Pattern:** `--{component}-{element}-{property}`

```scss
// Card component with multiple elements
--card-padding
--card-bg

--card-header-padding
--card-header-bg
--card-header-border-bottom

--card-body-padding
--card-body-gap

--card-footer-padding
--card-footer-bg
```

**When to use element scoping:**
- Component has distinct visual sections (header, footer, body)
- Each section can be styled independently
- Sub-elements have unique properties (e.g., card header has border-bottom, body doesn't)

**When NOT to use element scoping:**
- Simple components with no visual hierarchy (Badge, Tag)
- Elements that are purely structural (don't need custom styling)

## Examples

### Example 1: Button Component (Before → After)

**Current (Inconsistent):**
```scss
--btn-xs: 0.6875rem;
--btn-sm: 0.8125rem;
--btn-md: 0.9375rem;
--btn-lg: 1.125rem;

--btn-fs: var(--btn-md);          // ❌ Abbreviation
--btn-px: calc(var(--btn-fs) * 1.5);  // ❌ px means padding-inline?
--btn-py: calc(var(--btn-fs) * 0.5);  // ❌ py means padding-block?
--btn-rds: 0.375rem;              // ❌ radius abbreviation
--btn-cl: currentColor;           // ❌ color abbreviation
--btn-dsp: inline-flex;           // ❌ display abbreviation
--btn-bdr: 1px solid;             // ❌ border abbreviation
--btn-hov-bg: ..;                 // ❌ Inconsistent state name
```

**Proposed (Consistent):**
```scss
// Size tokens
--btn-size-xs: 0.6875rem;
--btn-size-sm: 0.8125rem;
--btn-size-md: 0.9375rem;
--btn-size-lg: 1.125rem;

// Base properties
--btn-fs: var(--btn-size-md);        // ✅ fs is approved abbreviation
--btn-padding-inline: calc(var(--btn-fs) * 1.5);  // ✅ Clear logical property
--btn-padding-block: calc(var(--btn-fs) * 0.5);   // ✅ Clear logical property
--btn-radius: 0.375rem;              // ✅ radius is approved
--btn-color: currentColor;           // ✅ Full word
--btn-display: inline-flex;          // ✅ Full word
--btn-border: 1px solid;             // ✅ Full word

// Variant properties
--btn-primary-bg: #0066cc;           // ✅ Variant pattern
--btn-primary-color: white;

--btn-secondary-bg: transparent;
--btn-secondary-border: 1px solid currentColor;

// State properties
--btn-hover-bg: ..;                  // ✅ Consistent state name
--btn-hover-transform: translateY(-1px);
--btn-focus-outline: 2px solid currentColor;
--btn-disabled-opacity: 0.6;
```

**Improvements:**
- ✅ Clear distinction between size tokens (`--btn-size-*`) and applied size
- ✅ Logical properties spelled out (`padding-inline`, not `px`)
- ✅ Consistent abbreviations (only approved ones: `fs`, `bg`)
- ✅ Discoverable variants (`--btn-primary-*`)
- ✅ Clear state variables (`--btn-hover-*`, `--btn-focus-*`)

### Example 2: Alert Component (Already Good!)

**Current (Keep This Pattern):**
```scss
// Base properties
--alert-padding: 1rem;
--alert-margin-block-end: 1rem;
--alert-border-radius: 0.375rem;
--alert-gap: 0.75rem;
--alert-border: 1px solid;
--alert-bg: #f0f0f0;
--alert-color: inherit;

// Semantic variants
--alert-success-bg: #d4edda;
--alert-success-border: #c3e6cb;
--alert-success-color: #155724;

--alert-error-bg: #f8d7da;
--alert-error-border: #f5c6cb;
--alert-error-color: #721c24;

--alert-warning-bg: #fff3cd;
--alert-warning-border: #ffeeba;
--alert-warning-color: #856404;

--alert-info-bg: #d1ecf1;
--alert-info-border: #bee5eb;
--alert-info-color: #0c5460;
```

**✅ This is already excellent! Use as reference pattern.**

**Why it works:**
- Full words for clarity (`padding`, `margin-block-end`, `border-radius`)
- Consistent variant structure (`--alert-{variant}-{property}`)
- Logical property usage (`margin-block-end`)
- Semantic variant names (`success`, `error`, `warning`, `info`)

### Example 3: Card Component (Before → After)

**Current:**
```scss
--card-p: 1rem;                  // ❌ Abbreviated padding
--card-bg: white;                // ✅ Good
--card-radius: 0.5rem;           // ✅ Good
--card-position: relative;       // ✅ Good
--card-display: flex;            // ✅ Good
--card-direction: column;        // ✅ Good
--card-gap: 1rem;                // ✅ Good
--card-align: stretch;           // ✅ Good
```

**Proposed:**
```scss
// Base card properties
--card-padding: 1rem;            // ✅ Full word
--card-bg: white;
--card-radius: 0.5rem;
--card-display: flex;
--card-direction: column;
--card-gap: 1rem;

// Element-specific (if card has header/footer)
--card-header-padding: 1rem 1.5rem;
--card-header-border-bottom: 1px solid #ddd;

--card-body-padding: 1.5rem;

--card-footer-padding: 1rem 1.5rem;
--card-footer-bg: #f9f9f9;
```

**Improvements:**
- ✅ `--card-p` → `--card-padding` (clear)
- ✅ Added element scoping for complex card layouts
- ✅ Maintains consistency with other components

### Example 4: Form/Input Component (Before → After)

**Current:**
```scss
--input-px: 0.75rem;             // ❌ Abbreviation
--input-py: 0.5rem;              // ❌ Abbreviation
--input-fs: 1rem;                // ✅ fs is approved
--input-w: 100%;                 // ❌ Abbreviation
--input-border-color: #ccc;      // ✅ Good
--input-bg: white;               // ✅ Good
```

**Proposed:**
```scss
--input-padding-inline: 0.75rem; // ✅ Clear logical property
--input-padding-block: 0.5rem;   // ✅ Clear logical property
--input-fs: 1rem;                // ✅ Approved abbreviation
--input-width: 100%;             // ✅ Full word
--input-border-color: #ccc;
--input-bg: white;
--input-radius: 0.25rem;

// State variables
--input-focus-outline: 2px solid blue;
--input-focus-outline-offset: 2px;
--input-disabled-bg: #e9ecef;
--input-disabled-opacity: 0.6;
```

## Risks / Trade-offs

### Risk 1: Breaking Changes in Implementation

**Risk:** When implementation proposals refactor variables, user stylesheets will break.

**Trade-off:**
- **Pro**: Clean, consistent naming across the library
- **Con**: Major version bump required; users must migrate

**Mitigation:**
- Provide comprehensive migration guide with before/after tables
- Offer find-and-replace regex patterns
- Publish beta versions for testing
- Document all changes in CHANGELOG with migration examples

### Risk 2: Longer Variable Names

**Risk:** Full words increase variable name length.

**Trade-off:**
- **Pro**: Improved clarity and discoverability
- **Con**: Slightly more typing (e.g., `--btn-padding-inline` vs `--btn-px`)

**Mitigation:**
- IDE autocomplete reduces typing burden
- Better DX outweighs extra characters
- Consistency reduces cognitive load

**Analysis:** Most professional design systems use full words (Material Design, Carbon, Polaris). This is an industry standard.

### Risk 3: Not All Edge Cases Covered

**Risk:** Some components may have unique requirements not covered by the standard.

**Mitigation:**
- Include escape hatch clause: "Deviate when necessary, document why"
- Gather feedback during implementation phases
- Update standard based on real-world usage

### Risk 4: Adoption Resistance

**Risk:** Developers may resist changing familiar variable names.

**Mitigation:**
- Lead by example in high-impact component refactoring
- Integrate standard into code review process
- Update CLAUDE.md and contribution guidelines
- Provide clear rationale for each decision

## Migration Plan

### Phase 1: Documentation (This Proposal)
1. Publish CSS Variable Reference Guide
2. Update CLAUDE.md with naming standard
3. Create migration guide template
4. Get team approval

### Phase 2: High-Impact Components
- Refactor Button, Form, Card (separate proposal)
- Gather user feedback
- Refine standard if needed

### Phase 3: Remaining Components
- Apply learnings from Phase 2
- Refactor all other components
- Update all documentation

### Phase 4: Tooling (Future)
- Build variable discovery tool
- Create automated migration scripts
- Generate documentation from SCSS files

## Open Questions

### Q1: Should we enforce this in linting?

**Options:**
A. Manual code review only
B. Create custom ESLint/Stylelint rules to enforce naming
C. Add pre-commit hooks that check variable names

**Recommendation:** Start with (A) manual review. Add linting in Phase 3 after the pattern is proven.

### Q2: How do we handle third-party design tokens?

**Scenario:** If the library integrates with an external design system (e.g., design tokens from Figma).

**Options:**
A. Prefix external tokens differently (`--token-*` vs `--component-*`)
B. Map external tokens to our naming convention
C. Allow external tokens to bypass the standard

**Recommendation:** Defer until needed. Current library doesn't integrate external systems.

### Q3: Should component-level class names follow similar patterns?

**Example:** If variables are `--btn-primary-bg`, should classes be `.btn-primary`?

**Decision:** Out of scope for this proposal. CSS variable naming is orthogonal to class naming.

### Q4: How do we handle responsive/breakpoint-specific variables?

**Example:**
```scss
--btn-fs-mobile: 0.875rem;
--btn-fs-tablet: 1rem;
--btn-fs-desktop: 1.125rem;
```

**Recommendation:** Defer to implementation. Most components use CSS clamp() or media queries within variables rather than breakpoint-suffixed variables.

## Success Metrics

This proposal succeeds if:

1. **Documentation is comprehensive** - Covers all pattern variations with examples
2. **Team approves the standard** - No major objections, consensus on approach
3. **Implementation proposals reference this** - Used as authoritative source
4. **Users find it intuitive** - Positive feedback during beta testing
5. **New components follow the pattern** - Standard is adopted for future work

## References

### Industry Examples

**Material Design (Google):**
```css
--mdc-theme-primary
--mdc-theme-on-primary
--mdc-typography-body1-font-size
```
Pattern: `--{system}-{category}-{property}`

**Carbon Design System (IBM):**
```css
--cds-button-primary
--cds-button-secondary
--cds-text-01
```
Pattern: `--{prefix}-{component}-{variant}`

**Polaris (Shopify):**
```css
--p-button-font-size
--p-button-padding
--p-color-bg-surface
```
Pattern: `--{prefix}-{component/category}-{property}`

**Takeaway:** All major design systems use **full words** and **consistent hierarchical patterns**. Our approach aligns with industry best practices.

### Related Reading

- [CSS Custom Properties Best Practices (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/)
- [Design Systems Naming Conventions](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)
