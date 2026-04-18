# WordCount Component

A React component that displays word count, character count, and reading time estimates for text content. Built with TypeScript and follows WCAG 2.1 accessibility guidelines.

## Features

- 📊 **Word Count**: Accurate word counting with proper handling of whitespace
- 🔢 **Character Count**: Optional character counting functionality  
- ⏱️ **Reading Time**: Estimated reading time based on average reading speed
- ♿ **Accessible**: Full WCAG 2.1 compliance with proper ARIA labels
- 🎨 **Customizable**: Custom labels and styling options
- 📱 **Responsive**: Works across all device sizes
- 🎯 **Type Safe**: Full TypeScript support

## Installation

The WordCount component is part of the FPKit component library:

```bash
npm install @fpkit/acss
```

## Basic Usage

```tsx
import { WordCount } from '@fpkit/acss'

function MyComponent() {
  const text = "Hello world, this is a sample text for word counting."
  
  return <WordCount text={text} />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | The text content to analyze |
| `showCharacterCount` | `boolean` | `false` | Whether to display character count |
| `showReadingTime` | `boolean` | `false` | Whether to display estimated reading time |
| `wordLabel` | `string` | `"Words"` | Custom label for word count |
| `characterLabel` | `string` | `"Characters"` | Custom label for character count |
| `readingTimeLabel` | `string` | `"Reading time"` | Custom label for reading time |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

### Basic Word Count

```tsx
<WordCount text="Hello world, this is a test." />
// Output: "7 Words"
```

### With Character Count

```tsx
<WordCount 
  text="Hello world, this is a test."
  showCharacterCount={true}
/>
// Output: "7 Words • 28 Characters"
```

### With Reading Time

```tsx
<WordCount 
  text="Your long article content here..."
  showReadingTime={true}
/>
// Output: "250 Words • 2 min Reading time"
```

### All Features Enabled

```tsx
<WordCount 
  text="Your content here..."
  showCharacterCount={true}
  showReadingTime={true}
/>
// Output: "250 Words • 1,234 Characters • 2 min Reading time"
```

### Custom Labels

```tsx
<WordCount 
  text="Your content here..."
  wordLabel="Terms"
  characterLabel="Chars"
  readingTimeLabel="Est. read time"
  showCharacterCount={true}
  showReadingTime={true}
/>
// Output: "250 Terms • 1,234 Chars • 2 min Est. read time"
```

### Interactive Example

```tsx
function InteractiveWordCount() {
  const [text, setText] = useState('')
  
  return (
    <div>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      />
      <WordCount 
        text={text}
        showCharacterCount={true}
        showReadingTime={true}
      />
    </div>
  )
}
```

## Accessibility Features

The WordCount component is built with accessibility in mind:

- **ARIA Labels**: Proper `aria-label` attributes for screen readers
- **Live Regions**: Uses `aria-live="polite"` for dynamic updates
- **Role Attributes**: Proper `role="status"` for status information
- **Semantic HTML**: Uses semantic HTML elements for better structure
- **High Contrast**: Supports high contrast mode
- **Keyboard Navigation**: Fully keyboard accessible

## Styling

The component comes with built-in CSS classes for styling:

- `.word-count` - Main container
- `.word-count__stat` - Individual stat container
- `.word-count__label` - Label text
- `.word-count__separator` - Separator between stats

### CSS Custom Properties

The component supports CSS custom properties for theming:

```css
.word-count {
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --focus-ring: #3b82f6;
}
```

### Size Modifiers

```css
.word-count--small { /* Smaller text size */ }
.word-count--large { /* Larger text size */ }
.word-count--block { /* Vertical layout */ }
.word-count--status { /* Status indicator styling */ }
```

## Algorithm Details

### Word Counting

- Splits text on whitespace using regex `/\s+/`
- Filters out empty strings
- Handles multiple spaces, tabs, and line breaks correctly

### Reading Time Calculation

- Based on average reading speed of 200 words per minute
- Uses `Math.ceil()` to round up to nearest minute
- Only shows for text with > 0 words

### Character Counting

- Uses `string.length` property
- Includes all characters (spaces, punctuation, etc.)

## Browser Support

The WordCount component supports all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- Uses `React.useMemo()` for efficient re-computation
- Only recalculates when text content changes
- Minimal DOM manipulation for optimal performance

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { WordCount, type WordCountProps } from '@fpkit/acss'

const props: WordCountProps = {
  text: "Sample text",
  showCharacterCount: true,
  showReadingTime: true
}
```

## Testing

The component includes comprehensive unit tests covering:

- Basic functionality
- Edge cases (empty text, whitespace)
- Accessibility features
- Custom props
- Error handling

Run tests with:

```bash
npm test word-count
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This component is part of the FPKit library and follows the same licensing terms.
