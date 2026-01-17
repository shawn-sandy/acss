import { StoryObj, Meta } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'

import Img from './img'

const meta: Meta<typeof Img> = {
  title: 'FP.React Components/Img',
  component: Img,
  tags: ['version:2.0.0', 'accessibility', 'responsive'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description:
        'Alternative text (empty string for decorative, descriptive text for semantic)',
    },
    width: {
      control: 'number',
      description: 'Image width in pixels',
    },
    height: {
      control: 'number',
      description: 'Image height in pixels',
    },
    loading: {
      control: 'radio',
      options: ['lazy', 'eager'],
      description: 'Loading strategy',
    },
    fetchpriority: {
      control: 'radio',
      options: ['low', 'high', 'auto'],
      description: 'Fetch priority hint',
    },
    decoding: {
      control: 'radio',
      options: ['auto', 'async', 'sync'],
      description: 'Decoding hint',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A semantic image component with accessibility and performance best practices. Supports responsive images, lazy loading, and error handling.',
      },
    },
  },
} satisfies Meta<typeof Img>

export default meta
type Story = StoryObj<typeof Img>

/**
 * Basic image with default settings.
 * Uses lazy loading by default for optimal performance.
 */
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
    alt: 'Beautiful landscape with mountains and lake',
    width: 800,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = await canvas.findByRole('img')
    await expect(img).toBeInTheDocument()
    await expect(img).toHaveAttribute('loading', 'lazy')
  },
}

/**
 * Decorative image with empty alt attribute.
 * Use for purely visual decoration that doesn't convey information.
 */
export const DecorativeImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&auto=format&fit=crop',
    alt: '',
    width: 400,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Decorative images should have an empty alt attribute (alt=""). These are images like borders, patterns, or visual separators that don\'t convey meaningful content.',
      },
    },
  },
}

/**
 * Semantic image with descriptive alt text.
 * Provides context about the image content for accessibility.
 */
export const SemanticImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    alt: 'Sales dashboard showing bar chart with quarterly revenue growth trends',
    width: 800,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Semantic images convey information and must have descriptive alt text that explains the content and context.',
      },
    },
  },
}

/**
 * Responsive image with srcSet and sizes.
 * Allows browser to choose appropriate image based on viewport and pixel density.
 */
export const ResponsiveImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
    srcSet:
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=320&auto=format&fit=crop 320w, ' +
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=640&auto=format&fit=crop 640w, ' +
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1024&auto=format&fit=crop 1024w',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
    alt: 'Responsive image adapts to different viewport sizes',
    width: 800,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Responsive images use srcSet and sizes attributes to serve different image sizes based on viewport width, improving performance and bandwidth usage.',
      },
    },
  },
}

/**
 * Hero image with eager loading and high priority.
 * Use for above-the-fold images that should load immediately.
 */
export const HeroImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&auto=format&fit=crop',
    alt: 'Hero banner showcasing mountain landscape at sunset',
    width: 1200,
    height: 600,
    loading: 'eager',
    fetchpriority: 'high',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hero images and other above-the-fold images should use loading="eager" and fetchpriority="high" to prioritize their loading.',
      },
    },
  },
}

/**
 * Default SVG gradient placeholder (automatic fallback).
 * Demonstrates the built-in SVG placeholder that appears when images fail to load.
 */
export const DefaultSvgPlaceholder: Story = {
  args: {
    src: 'https://invalid-url-will-fail.com/image.jpg',
    alt: 'Failed image with default SVG placeholder',
    width: 800,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When an image fails to load and no custom placeholder is provided, a beautiful SVG gradient placeholder is displayed automatically. The SVG is inline (no network requests), responsive, and shows the image dimensions for debugging.',
      },
    },
  },
}

/**
 * Image with custom placeholder fallback.
 * Displays custom image when primary source fails to load.
 */
export const CustomPlaceholder: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    placeholder:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ef4444" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="system-ui" font-size="20"%3ECustom Placeholder%3C/text%3E%3C/svg%3E',
    alt: 'Product photo',
    width: 400,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When an image fails to load, a custom placeholder can be displayed. This example uses a custom SVG placeholder with a red background.',
      },
    },
  },
}

/**
 * Image with custom error handler.
 * Demonstrates error logging while still showing the default fallback.
 */
export const CustomErrorHandler: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Failed image',
    width: 400,
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.error('Image failed to load:', e.currentTarget.src)
      // Log to analytics, show notification, etc.
      // The default SVG placeholder will still be applied automatically
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom error handlers can be provided via the onError prop for logging, analytics, or notifications. The default SVG placeholder is still applied automatically. Call e.preventDefault() in your handler if you want to prevent the default fallback.',
      },
    },
  },
}

/**
 * Image with custom error handler that prevents default fallback.
 * Demonstrates full control over error handling.
 */
export const CustomErrorHandlerWithPreventDefault: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Failed image with custom fallback',
    width: 400,
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.error('Image failed to load:', e.currentTarget.src)

      // Prevent default fallback and use custom image
      e.preventDefault()
      const customFallback = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f59e0b" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="system-ui" font-size="18"%3ECustom Error Handler%3C/text%3E%3C/svg%3E`
      e.currentTarget.src = customFallback
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'When you call e.preventDefault() in the onError handler, the default SVG placeholder is not applied, giving you full control over the fallback behavior. This example shows a custom amber/orange placeholder.',
      },
    },
  },
}

/**
 * Image with load callback.
 * Executes custom logic when image successfully loads.
 */
export const WithLoadCallback: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&auto=format&fit=crop',
    alt: 'Image with load tracking',
    width: 600,
    onLoad: (e) => {
      // eslint-disable-next-line no-console
      console.log('Image loaded successfully:', e.currentTarget.src)
      // Analytics tracking, performance monitoring, etc.
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'The onLoad callback fires when an image successfully loads, useful for analytics, performance tracking, or triggering animations.',
      },
    },
  },
}

/**
 * Small profile image with eager loading.
 * Suitable for avatars, thumbnails, and small images.
 */
export const ProfileImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&crop=faces',
    alt: 'User profile photo',
    width: 150,
    height: 150,
    loading: 'eager',
    styles: { borderRadius: '50%' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Small images like profile photos can use eager loading since they have minimal performance impact. Custom styles can be applied for circular avatars.',
      },
    },
  },
}

/**
 * Image with async decoding.
 * Prevents blocking the main thread during image decoding.
 */
export const AsyncDecoding: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
    alt: 'Image with async decoding',
    width: 800,
    decoding: 'async',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Async decoding prevents image decoding from blocking the main thread, improving perceived performance especially for large images.',
      },
    },
  },
}

/**
 * SVG Placeholder Gallery - Different Dimensions.
 * Demonstrates how the SVG placeholder adapts to various image sizes.
 */
export const PlaceholderGallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <Img
        src="https://will-fail-1.jpg"
        alt="Square placeholder"
        width={400}
        height={400}
      />
      <Img
        src="https://will-fail-2.jpg"
        alt="Landscape placeholder"
        width={600}
        height={400}
      />
      <Img
        src="https://will-fail-3.jpg"
        alt="Portrait placeholder"
        width={400}
        height={600}
      />
      <Img
        src="https://will-fail-4.jpg"
        alt="Wide placeholder"
        width={800}
        height={400}
      />
      <Img
        src="https://will-fail-5.jpg"
        alt="Small placeholder"
        width={200}
        height={200}
      />
      <Img
        src="https://will-fail-6.jpg"
        alt="Tall placeholder"
        width={300}
        height={500}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Gallery of failed images showing the default SVG placeholder at various dimensions. The SVG gradient and elements scale proportionally for each size, demonstrating perfect responsiveness.',
      },
    },
  },
}

/**
 * Gallery of multiple images with lazy loading.
 * Demonstrates efficient loading of multiple images.
 */
export const ImageGallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <Img
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format&fit=crop"
        alt="Mountain landscape 1"
        width={400}
      />
      <Img
        src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400&auto=format&fit=crop"
        alt="Mountain landscape 2"
        width={400}
      />
      <Img
        src="https://images.unsplash.com/photo-1682687219356-e820ca126c92?w=400&auto=format&fit=crop"
        alt="Mountain landscape 3"
        width={400}
      />
      <Img
        src="https://images.unsplash.com/photo-1682687220063-4742bd7f3b80?w=400&auto=format&fit=crop"
        alt="Mountain landscape 4"
        width={400}
      />
      <Img
        src="https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400&auto=format&fit=crop"
        alt="Mountain landscape 5"
        width={400}
      />
      <Img
        src="https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400&auto=format&fit=crop"
        alt="Mountain landscape 6"
        width={400}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Gallery of images using lazy loading by default. Only images near the viewport will load, improving initial page load performance.',
      },
    },
  },
}
