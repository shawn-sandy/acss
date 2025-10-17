# UI Component Design Document

## Overview

This document captures the architectural reasoning and design decisions for documenting and enhancing the UI polymorphic component. It addresses the type system architecture, relationship to the FP component, and implementation trade-offs.

## Problem Space

### Current State

The UI component exists as a polymorphic React component that can render as any HTML element while maintaining full TypeScript type safety. It's used by 25+ components across fpkit:

```typescript
// Current implementation
const UI: FPComponent = React.forwardRef(
  <C extends React.ElementType>(
    { as, styles, classes, children, defaultStyles, ...props }: FPProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div";
    const styleObj: React.CSSProperties = { ...defaultStyles, ...styles };
    return (
      <Component ref={ref} style={styleObj} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);
```

**Issues**:
1. No documentation explaining the polymorphic pattern
2. Complex type system without explanatory comments
3. Undefined behavior for `renderStyles` prop (declared but not used)
4. No examples showing type safety benefits
5. No tests verifying polymorphic behavior
6. Unclear relationship with FP component

### User Needs

**Library Consumers**:
- Need examples showing how to use polymorphic components
- Want to understand type safety guarantees
- Require documentation on style merging behavior

**Contributors**:
- Need to understand the component architecture
- Want to know when to use UI vs FP
- Require specs to prevent regressions

**Maintainers**:
- Need to document design decisions
- Want to prevent breaking changes
- Require tests to catch issues early

## Architectural Decisions

### Decision 1: Document UI and FP Separately

**Context**: The codebase contains two nearly identical polymorphic components:
- `fp.tsx` - Has tests, includes `renderStyles` in types
- `ui.tsx` - Used by 25+ components, has `defaultStyles` support

**Options Considered**:

**Option A**: Consolidate into single component
- Pros: Single source of truth, reduced duplication
- Cons: Breaking changes, migration effort, risk of regression

**Option B**: Document separately and clarify relationship
- Pros: No breaking changes, preserves existing patterns
- Cons: Maintains duplication, requires clear documentation

**Decision**: **Option B** - Document separately per user request

**Rationale**:
- User explicitly requested separate documentation
- Consolidation is a larger architectural change requiring its own proposal
- Documenting both clarifies current state and enables future consolidation
- No immediate technical debt from duplication

**Implementation**:
- Document UI component fully in this proposal
- Add section explaining FP/UI relationship
- Note in documentation that consolidation may occur in future
- Provide guidance on when to use each

### Decision 2: Handle `renderStyles` Prop

**Context**: The `renderStyles` prop is defined in `FPProps` type but not implemented in component logic:

```typescript
type FPProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    renderStyles?: boolean;  // Declared but not used
    styles?: React.CSSProperties;
    classes?: string;
    id?: string;
    children?: React.ReactNode;
  }
>;
```

**Options Considered**:

**Option A**: Implement the feature
```typescript
const styleObj = renderStyles !== false
  ? { ...defaultStyles, ...styles }
  : {};
```
- Pros: Makes type signature honest
- Cons: Breaking change if components rely on styles always applying, adds runtime check

**Option B**: Remove the prop
- Pros: Clean type signature
- Cons: Breaking change for components passing `renderStyles={false}`

**Option C**: Mark as reserved/deprecated with documentation
- Pros: No breaking changes, documents intent
- Cons: Type signature includes unused prop

**Decision**: **Option C** - Mark as reserved

**Rationale**:
- Zero breaking changes across 25+ consuming components
- Searching codebase shows no actual usage of `renderStyles` prop
- Documents the prop exists but is not yet implemented
- Preserves option to implement later if needed
- JSDoc can warn developers not to use it

**Implementation**:
```typescript
/**
 * @deprecated Reserved for future use. Currently has no effect.
 * Styles are always rendered regardless of this prop value.
 */
renderStyles?: boolean;
```

### Decision 3: Directory Organization

**Context**: UI component is currently at root of components directory. Should it be organized into its own directory?

**Options Considered**:

**Option A**: Keep flat structure
- `packages/fpkit/src/components/ui.tsx`
- `packages/fpkit/src/components/ui.stories.tsx`
- `packages/fpkit/src/components/ui.test.tsx`
- `packages/fpkit/src/components/README-UI.mdx`

**Option B**: Create directory structure
- `packages/fpkit/src/components/ui/ui.tsx`
- `packages/fpkit/src/components/ui/ui.stories.tsx`
- `packages/fpkit/src/components/ui/ui.test.tsx`
- `packages/fpkit/src/components/ui/README.mdx`

**Decision**: **Option A** initially, **Option B** as Phase 5

**Rationale**:
- Phases 1-4 can proceed without import changes
- Directory organization is risky (25+ files to update)
- Can be done separately after documentation proves valuable
- Reduces scope and risk of initial implementation
- Aligns with other components (Button, Alert have directories)

**Implementation**:
- Complete documentation/testing without moving files
- Create optional Phase 5 for directory migration
- Provide detailed migration plan in tasks.md
- Make Phase 5 optional based on maintainer preference

### Decision 4: Type System Documentation Strategy

**Context**: The polymorphic type system is complex and novel to many developers:

```typescript
type PolymorphicComponentPropWithRef<C, Props> =
  PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
```

**Options Considered**:

**Option A**: Minimal JSDoc on public API only
- Document component and FPProps
- Leave helper types undocumented

**Option B**: Comprehensive JSDoc on all types
- Document every type in the chain
- Explain type system architecture

**Decision**: **Option B** - Comprehensive documentation

**Rationale**:
- Polymorphic pattern is advanced TypeScript
- Contributors need to understand the system to modify it
- JSDoc provides IDE tooltips for better DX
- Educational value for developers learning pattern
- Minimal cost (comments are stripped in build)

**Implementation**:
```typescript
/**
 * Extracts the appropriate ref type for a given element type.
 *
 * @typeParam C - The HTML element type (e.g., 'button', 'div', 'a')
 * @example
 * type ButtonRef = PolymorphicRef<'button'> // React.Ref<HTMLButtonElement>
 */
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];
```

## Type System Architecture

### Polymorphic Component Pattern

The UI component implements the "polymorphic component" pattern, allowing a single component to render as different HTML elements while preserving type safety.

**Core Mechanism**:
1. Accept `as` prop defining the element type
2. Use generics to infer native props for that element
3. Merge custom props with native props
4. Omit conflicting props to avoid type errors
5. Forward refs with correct typing

**Type Chain**:
```
FPComponent (function signature)
    ↓
FPProps<C> (merged props with ref)
    ↓
PolymorphicComponentPropWithRef<C, Props>
    ↓
PolymorphicComponentProp<C, Props> (props without ref)
    ↓
PropsWithChildren<Props & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, ...>
```

**Type Flow Example**:
```typescript
// User writes:
<UI as="button" onClick={handler} disabled>Click</UI>

// TypeScript resolves:
// C = 'button'
// ComponentPropsWithoutRef<'button'> provides: onClick, disabled, type, etc.
// Custom props provide: styles, classes, defaultStyles
// Omit removes conflicts
// Result: Fully typed button with custom props
```

### Key Design Constraints

1. **Type Safety**: Must enforce correct props for chosen element
2. **Flexibility**: Must support any valid React element type
3. **Ref Forwarding**: Must preserve ref type for element
4. **Prop Spreading**: Must allow native props without explicit typing
5. **IntelliSense**: Must provide autocomplete for element-specific props

## Style Merging Behavior

### Current Implementation

```typescript
const styleObj: React.CSSProperties = { ...defaultStyles, ...styles };
```

**Behavior**:
- `defaultStyles` applied first (base layer)
- `styles` prop applied second (override layer)
- Later styles win (standard object spread)
- Both props are optional
- Result is always applied (no conditional rendering)

**Example**:
```typescript
<UI
  defaultStyles={{ padding: '1rem', color: 'blue' }}
  styles={{ color: 'red' }}
>
  Text
</UI>

// Rendered with: { padding: '1rem', color: 'red' }
```

### Design Pattern

This enables the "customizable defaults" pattern used throughout fpkit:

```typescript
// Component provides defaults
const Button = ({ variant, ...props }) => (
  <UI
    as="button"
    defaultStyles={{ padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
    {...props}  // User can override with styles prop
  />
);

// User can customize
<Button styles={{ padding: '1rem 2rem' }} />
```

**Benefits**:
- Components can enforce design system defaults
- Users can override without forking components
- CSS custom properties can be set dynamically
- Predictable merge behavior (last wins)

## Testing Strategy

### Test Categories

**1. Rendering Tests**
- Default rendering (div)
- Polymorphic rendering (button, span, a, etc.)
- Children rendering
- Snapshot tests

**2. Style Tests**
- Inline styles application
- Style merging (defaultStyles + styles)
- className application
- Empty/undefined styles

**3. Prop Tests**
- Native prop spreading (onClick, href, etc.)
- Type-specific props (button disabled, anchor target)
- Custom prop handling (id, classes)
- Prop combinations

**4. Ref Tests**
- Ref forwarding for div
- Ref forwarding for different elements
- Ref access to DOM methods
- Ref type safety

**5. Edge Cases**
- Empty children
- Null children
- Undefined props
- Missing as prop (default div)

### Coverage Goals

- **Line Coverage**: >85%
- **Branch Coverage**: >80%
- **Function Coverage**: 100% (single component function)

### Testing Tools

- **Vitest**: Test runner (project standard)
- **React Testing Library**: Component testing
- **@testing-library/user-event**: Interaction testing
- **Snapshot Testing**: Regression prevention

## Documentation Structure

### README.mdx Sections

1. **Title and Summary**: One-sentence description
2. **Overview**: Explain polymorphic pattern and purpose
3. **Features**: Bullet list of capabilities
4. **Props Table**: All props with types and descriptions
5. **Usage Examples**:
   - Basic usage
   - Polymorphic variants
   - Style customization
   - Ref forwarding
   - Type-safe props
6. **Technical Details**: Type system architecture
7. **Common Patterns**: How other components use UI
8. **FP vs UI**: Relationship and differences
9. **Accessibility Notes**: Semantic HTML guidance
10. **Additional Notes**: Gotchas and best practices

### Storybook Story Structure

- **Default**: Basic div with controls
- **Polymorphic Examples**: Button, Span, Anchor, etc.
- **Style Merging**: Show defaultStyles override
- **Ref Forwarding**: Interactive ref example
- **Real-world Patterns**: Button, Badge, Tag examples
- **Play Functions**: Automated interaction tests

## Performance Considerations

### Component Performance

**Current**:
- Minimal overhead (thin wrapper)
- Single object spread for styles
- No hooks or state
- Negligible re-render cost

**No Changes**: Documentation doesn't affect runtime performance

### Bundle Size Impact

**Documentation Files**:
- README.mdx: Storybook only, not in bundle
- Stories: Storybook only, not in bundle
- Tests: Test suite only, not in bundle
- JSDoc: Stripped during compilation, not in bundle

**Net Impact**: Zero bytes added to production bundle

### Type Checking Performance

**Potential Concern**: Complex generic types can slow TypeScript compilation

**Mitigation**:
- Types are already in codebase (no new complexity)
- JSDoc doesn't affect type checking speed
- Modern TypeScript handles polymorphic types efficiently

**Expected**: No measurable impact on build times

## Migration Path (Phase 5)

### Import Update Strategy

**Affected Files**: 25+ components importing `ui.tsx`

**Current Imports**:
```typescript
import UI from '../ui'
import UI from '#components/ui'
```

**Target Imports**:
```typescript
import UI from '../ui/ui'
import UI from '#components/ui/ui'
```

**Execution Plan**:
1. Create `ui/` directory
2. Move `ui.tsx` to `ui/ui.tsx`
3. Create barrel export `ui/index.ts`:
   ```typescript
   export { default } from './ui';
   ```
4. Update imports (automated find/replace)
5. Run build and tests
6. Verify Storybook loads
7. Commit with descriptive message

**Rollback Plan**:
- Git revert if any issues
- Keep original imports in deprecation period
- Use barrel export for compatibility

**Risk Assessment**: Low
- Mechanical change (find/replace)
- Tests will catch broken imports
- Barrel export provides escape hatch

## Future Enhancements

### Potential Improvements (Out of Scope)

1. **Implement `renderStyles` Prop**: Add conditional style rendering
2. **Consolidate FP and UI**: Merge into single component
3. **Add Polymorphic `role` Prop**: Enhanced accessibility support
4. **CSS Modules Support**: Add `cssModule` prop
5. **Style Composition Helpers**: Utility functions for style merging
6. **Generic Prop Forwarding**: Better handling of data-* attributes

### Documentation Evolution

- Add video tutorials for polymorphic pattern
- Create codesandbox examples
- Write blog post explaining type system
- Add to fpkit documentation site

## Success Metrics

### Quantitative

- [ ] 100% of types have JSDoc
- [ ] >85% test coverage
- [ ] >8 Storybook stories
- [ ] >15 test cases
- [ ] Zero TypeScript errors
- [ ] All CI checks pass

### Qualitative

- [ ] Documentation is clear to TypeScript beginners
- [ ] Examples cover common use cases
- [ ] Tests serve as readable specifications
- [ ] Contributors understand when to use UI vs FP
- [ ] Storybook stories demonstrate full capabilities

## Questions and Answers

### Why not implement `renderStyles` prop?

No current use case. All 25+ consumers want styles applied unconditionally. Adding the logic creates runtime overhead for unused feature. Better to document as reserved.

### Why not consolidate FP and UI?

User requested separate documentation. Consolidation is larger change requiring migration strategy, deprecation period, and testing across all consumers. Should be separate proposal.

### Why include comprehensive JSDoc for internal types?

Polymorphic pattern is advanced. Contributors modifying the component need to understand the type chain. JSDoc provides IDE tooltips and serves as inline documentation.

### Why defer directory organization to Phase 5?

Reduces risk and scope. Documentation value can be proven before making structural changes. Import updates affect 25+ files and could cause issues.

### How does this relate to other component documentation?

Follows patterns from Alert and Button components. Comprehensive README, Storybook stories, unit tests, JSDoc comments. Establishes template for documenting other primitives.
