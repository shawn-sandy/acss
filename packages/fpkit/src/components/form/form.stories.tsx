import React from "react";
import { StoryObj, Meta } from "@storybook/react-vite";
import { within, expect, userEvent, fn } from "storybook/test";
import { useState } from "react";

import Form from "./form";
import "./form.scss";

// Type assertion to resolve React type compatibility issues
const FormComponent = Form as unknown as typeof Form;

const meta: Meta<typeof FormComponent> = {
  title: "FP.React Forms/Form",
  tags: ["stable", "autodocs"],
  component: FormComponent,
  parameters: {
    docs: {
      description: {
        component: `
An accessible HTML form wrapper with validation support and compound component pattern.
Provides proper ARIA attributes, form submission handling, and validation state management.

## Features
- ✅ WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ Compound component pattern (Form.Field, Form.Input, etc.)
- ✅ Form submission and validation state management
- ✅ Keyboard navigation support
- ✅ Controlled and uncontrolled form patterns
        `,
      },
    },
  },
  args: {
    name: "contact-form",
    "aria-label": "Contact form",
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Form>;

// Mock submit handler for stories
const handleSubmit = fn();

/**
 * Basic form example with required fields
 */
export const BasicForm: Story = {
  args: {
    onSubmit: handleSubmit,
    children: (
      <>
        <FormComponent.Field label="Name" labelFor="name" required>
          <FormComponent.Input id="name" name="name" required />
        </FormComponent.Field>
        <FormComponent.Field label="Email" labelFor="email" required>
          <FormComponent.Input id="email" name="email" type="email" required />
        </FormComponent.Field>
        <FormComponent.Field label="Message" labelFor="message">
          <FormComponent.Textarea id="message" name="message" rows={4} />
        </FormComponent.Field>
        <button type="submit">Submit</button>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Form renders correctly", async () => {
      const form = canvas.getByRole("form");
      expect(form).toBeInTheDocument();
    });

    await step("Required fields are marked", async () => {
      expect(
        canvas.getByText("*", { selector: ".field-required" })
      ).toBeInTheDocument();
    });

    await step("All inputs are accessible", async () => {
      expect(canvas.getByLabelText(/name/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/email/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/message/i)).toBeInTheDocument();
    });

    await step("Submit button is present", async () => {
      expect(
        canvas.getByRole("button", { name: /submit/i })
      ).toBeInTheDocument();
    });
  },
} as Story;

/**
 * Form with validation states and error messages
 */
export const WithValidation: Story = {
  render: function ValidationExample() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (value: string) => {
      if (!value) {
        setEmailError("Email is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    };

    return (
      <FormComponent
        aria-label="Registration form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <FormComponent.Field
          label="Email"
          labelFor="email-validation"
          required
          errorMessage={emailError}
        >
          <FormComponent.Input
            id="email-validation"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
            validationState={emailError ? "invalid" : email ? "valid" : "none"}
            required
          />
        </FormComponent.Field>
        <button type="submit">Register</button>
      </FormComponent>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await step("Enter invalid email", async () => {
      const emailInput = canvas.getByLabelText(/email/i);
      await user.type(emailInput, "invalid-email");
      await user.tab();
    });

    await step("Error message is displayed", async () => {
      expect(
        canvas.getByText(/please enter a valid email/i)
      ).toBeInTheDocument();
    });

    await step("Input has aria-invalid", async () => {
      const emailInput = canvas.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });
  },
};

/**
 * Form with hint text to guide users
 */
export const WithHintText: Story = {
  args: {
    "aria-label": "Account creation form",
    children: (
      <>
        <FormComponent.Field
          label="Username"
          labelFor="username"
          required
          hintText="Must be 3-20 characters, letters and numbers only"
        >
          <FormComponent.Input
            id="username"
            name="username"
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9]+"
            required
          />
        </FormComponent.Field>
        <FormComponent.Field
          label="Password"
          labelFor="password"
          required
          hintText="Minimum 8 characters, include uppercase, lowercase, and number"
        >
          <FormComponent.Input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
          />
        </FormComponent.Field>
        <button type="submit">Create Account</button>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Hint text is visible", async () => {
      expect(canvas.getByText(/must be 3-20 characters/i)).toBeInTheDocument();
      expect(canvas.getByText(/minimum 8 characters/i)).toBeInTheDocument();
    });

    await step("Hint text is associated with inputs", async () => {
      const usernameInput = canvas.getByLabelText(/username/i);
      expect(usernameInput).toHaveAttribute(
        "aria-describedby",
        "username-hint"
      );
    });
  },
};

/**
 * Form with select dropdown
 */
export const WithSelect: Story = {
  args: {
    "aria-label": "Profile form",
    children: (
      <>
        <FormComponent.Field label="Full Name" labelFor="fullname" required>
          <FormComponent.Input id="fullname" name="fullname" required />
        </FormComponent.Field>
        <FormComponent.Field label="Country" labelFor="country" required>
          <FormComponent.Select id="country" name="country" required>
            <FormComponent.Select.Option value="">
              Select a country
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="us">
              United States
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="ca">
              Canada
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="uk">
              United Kingdom
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="au">
              Australia
            </FormComponent.Select.Option>
          </FormComponent.Select>
        </FormComponent.Field>
        <button type="submit">Save Profile</button>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await step("Select is accessible", async () => {
      const select = canvas.getByLabelText(/country/i);
      expect(select).toBeInTheDocument();
    });

    await step("Select can be changed", async () => {
      const select = canvas.getByLabelText(/country/i);
      await user.selectOptions(select, "us");
      expect(select).toHaveValue("us");
    });
  },
};

/**
 * Form with optional fields
 */
export const WithOptionalFields: Story = {
  args: {
    "aria-label": "Contact preferences",
    children: (
      <>
        <FormComponent.Field label="Email" labelFor="email-req" required>
          <FormComponent.Input
            id="email-req"
            name="email"
            type="email"
            required
          />
        </FormComponent.Field>
        <FormComponent.Field label="Phone" labelFor="phone-opt" optional>
          <FormComponent.Input id="phone-opt" name="phone" type="tel" />
        </FormComponent.Field>
        <FormComponent.Field label="Address" labelFor="address-opt" optional>
          <FormComponent.Textarea id="address-opt" name="address" rows={3} />
        </FormComponent.Field>
        <button type="submit">Save Preferences</button>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Required field is marked with asterisk", async () => {
      expect(
        canvas.getByText("*", { selector: ".field-required" })
      ).toBeInTheDocument();
    });

    await step("Optional fields are marked", async () => {
      const optionalMarkers = canvas.getAllByText("(optional)");
      expect(optionalMarkers).toHaveLength(2);
    });
  },
};

/**
 * Form submission loading state
 */
export const LoadingState: Story = {
  render: function LoadingStateExample() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 2000);
    };

    return (
      <FormComponent
        aria-label="Submission form"
        onSubmit={handleFormSubmit}
        status={isSubmitting ? "submitting" : "idle"}
      >
        <FormComponent.Field label="Name" labelFor="loading-name" required>
          <FormComponent.Input
            id="loading-name"
            name="name"
            disabled={isSubmitting}
            required
          />
        </FormComponent.Field>
        <FormComponent.Field label="Email" labelFor="loading-email" required>
          <FormComponent.Input
            id="loading-email"
            name="email"
            type="email"
            disabled={isSubmitting}
            required
          />
        </FormComponent.Field>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </FormComponent>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await step("Submit the form", async () => {
      const submitButton = canvas.getByRole("button");
      await user.click(submitButton);
    });

    await step("Form shows loading state", async () => {
      const form = canvas.getByRole("form");
      expect(form).toHaveAttribute("aria-busy", "true");
      expect(form).toHaveAttribute("data-status", "submitting");
    });

    await step("Submit button shows loading text", async () => {
      expect(canvas.getByText(/submitting/i)).toBeInTheDocument();
    });
  },
};

/**
 * Complete registration form example
 */
export const RegistrationForm: Story = {
  args: {
    name: "registration",
    "aria-labelledby": "registration-heading",
    children: (
      <>
        <h2 id="registration-heading">Create Your Account</h2>
        <FormComponent.Field
          label="Email Address"
          labelFor="reg-email"
          required
          hintText="We'll never share your email"
        >
          <FormComponent.Input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </FormComponent.Field>
        <FormComponent.Field
          label="Password"
          labelFor="reg-password"
          required
          hintText="At least 8 characters"
        >
          <FormComponent.Input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </FormComponent.Field>
        <FormComponent.Field label="Country" labelFor="reg-country" required>
          <FormComponent.Select id="reg-country" name="country" required>
            <FormComponent.Select.Option value="">
              Choose your country
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="us">
              United States
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="ca">
              Canada
            </FormComponent.Select.Option>
            <FormComponent.Select.Option value="uk">
              United Kingdom
            </FormComponent.Select.Option>
          </FormComponent.Select>
        </FormComponent.Field>
        <FormComponent.Field label="Bio" labelFor="reg-bio" optional>
          <FormComponent.Textarea
            id="reg-bio"
            name="bio"
            placeholder="Tell us about yourself"
            maxLength={500}
            rows={4}
          />
        </FormComponent.Field>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Create Account
        </button>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("All form fields render", async () => {
      expect(canvas.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/password/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/country/i)).toBeInTheDocument();
      expect(canvas.getByLabelText(/bio/i)).toBeInTheDocument();
    });

    await step("Form is properly labeled", async () => {
      const form = canvas.getByRole("form");
      expect(form).toHaveAttribute("aria-labelledby", "registration-heading");
    });
  },
};

/**
 * Form with onEnter accessibility handlers
 * Demonstrates the onEnter prop for keyboard-driven workflows
 */
export const WithOnEnterHandler: Story = {
  render: function OnEnterHandlerExample() {
    const [searchQuery, setSearchQuery] = useState("");
    const [comments, setComments] = useState("");
    const [category, setCategory] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleSearch = () => {
      setMessages((prev) => [...prev, `🔍 Searching for: "${searchQuery}"`]);
    };

    const handleCommentSubmit = () => {
      if (comments.trim()) {
        setMessages((prev) => [
          ...prev,
          `💬 Comment submitted: "${comments.trim()}"`,
        ]);
        setComments("");
      }
    };

    const handleCategorySelect = () => {
      setMessages((prev) => [...prev, `📁 Category selected: "${category}"`]);
    };

    return (
      <div>
        <FormComponent aria-label="Keyboard accessibility demo">
          <FormComponent.Field
            label="Search"
            labelFor="search-input"
            hintText="Press Enter to search"
          >
            <FormComponent.Input
              id="search-input"
              name="search"
              type="search"
              placeholder="Type and press Enter..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              onEnter={handleSearch}
            />
          </FormComponent.Field>

          <FormComponent.Field
            label="Comments"
            labelFor="comments-textarea"
            hintText="Press Enter to submit (Shift+Enter for new line)"
          >
            <FormComponent.Textarea
              id="comments-textarea"
              name="comments"
              placeholder="Type your comment..."
              value={comments}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setComments(e.target.value)
              }
              onEnter={handleCommentSubmit}
              rows={4}
            />
          </FormComponent.Field>

          <FormComponent.Field
            label="Category"
            labelFor="category-select"
            hintText="Press Enter after selecting"
          >
            <FormComponent.Select
              id="category-select"
              name="category"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategory(e.target.value)
              }
              onEnter={handleCategorySelect}
            >
              <FormComponent.Select.Option value="">
                Select category
              </FormComponent.Select.Option>
              <FormComponent.Select.Option value="bug">
                Bug Report
              </FormComponent.Select.Option>
              <FormComponent.Select.Option value="feature">
                Feature Request
              </FormComponent.Select.Option>
              <FormComponent.Select.Option value="question">
                Question
              </FormComponent.Select.Option>
            </FormComponent.Select>
          </FormComponent.Field>
        </FormComponent>

        {messages.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "0.25rem",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Action Log:</h3>
            <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
              {messages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await step("Input onEnter: Type and press Enter", async () => {
      const searchInput = canvas.getByLabelText(/search/i);
      await user.type(searchInput, "accessibility test");
      await user.type(searchInput, "{Enter}");

      // Verify action was logged
      expect(
        canvas.getByText(/Searching for: "accessibility test"/i)
      ).toBeInTheDocument();
    });

    await step("Textarea onEnter: Enter without Shift", async () => {
      const textarea = canvas.getByLabelText(/comments/i);
      await user.type(textarea, "This is a test comment");
      await user.type(textarea, "{Enter}");

      // Verify comment was submitted
      expect(
        canvas.getByText(/Comment submitted: "This is a test comment"/i)
      ).toBeInTheDocument();
    });

    await step(
      "Textarea Shift+Enter: Adds newline without triggering onEnter",
      async () => {
        const textarea = canvas.getByLabelText(/comments/i);
        await user.type(textarea, "Line 1{Shift>}{Enter}{/Shift}Line 2");

        // Verify textarea contains newline
        expect(textarea).toHaveValue("Line 1\nLine 2");
      }
    );

    await step("Select onEnter: Select and press Enter", async () => {
      const select = canvas.getByLabelText(/category/i);
      await user.selectOptions(select, "bug");
      await user.type(select, "{Enter}");

      // Verify category selection was logged
      expect(canvas.getByText(/Category selected: "bug"/i)).toBeInTheDocument();
    });
  },
};

/**
 * CSS Variable Customization
 *
 * Demonstrates how to customize form/input appearance using the new standardized
 * CSS custom property naming convention.
 *
 * New variable naming patterns:
 * - Logical properties: `--input-padding-inline`, `--input-padding-block`
 * - Full property names: `--input-width`, `--input-radius`, `--input-border`
 * - Approved abbreviations: `--input-fs` (font-size), `--input-bg` (background)
 * - State variables: `--input-focus-outline`, `--input-disabled-bg`
 */
export const Customization: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Custom input styling */}
      <div>
        <h4>Custom Input Styling</h4>
        <FormComponent aria-label="Custom input example">
          <FormComponent.Field label="Name" labelFor="custom-name">
            <FormComponent.Input
              id="custom-name"
              name="name"
              placeholder="Enter your name"
              styles={{
                "--input-padding-inline": "1.5rem",
                "--input-padding-block": "0.75rem",
                "--input-fs": "1.125rem",
                "--input-radius": "0.5rem",
                "--input-border": "2px solid #0066cc",
              }}
            />
          </FormComponent.Field>
        </FormComponent>
      </div>

      {/* Compact form */}
      <div>
        <h4>Compact Form</h4>
        <FormComponent aria-label="Compact form example">
          <FormComponent.Field label="Email" labelFor="compact-email">
            <FormComponent.Input
              id="compact-email"
              name="email"
              type="email"
              styles={{
                "--input-padding-inline": "0.75rem",
                "--input-padding-block": "0.5rem",
                "--input-fs": "0.875rem",
                "--input-radius": "0.25rem",
              }}
            />
          </FormComponent.Field>
        </FormComponent>
      </div>

      {/* Custom focus states */}
      <div>
        <h4>Custom Focus States</h4>
        <FormComponent aria-label="Focus state example">
          <FormComponent.Field label="Username" labelFor="focus-username">
            <FormComponent.Input
              id="focus-username"
              name="username"
              placeholder="Try focusing this input"
              styles={{
                "--input-focus-outline": "3px solid #0066cc",
                "--input-focus-outline-offset": "2px",
                "--input-border": "2px solid #ddd",
              }}
            />
          </FormComponent.Field>
        </FormComponent>
      </div>

      {/* Custom textarea */}
      <div>
        <h4>Custom Textarea</h4>
        <FormComponent aria-label="Textarea example">
          <FormComponent.Field label="Message" labelFor="custom-message">
            <FormComponent.Textarea
              id="custom-message"
              name="message"
              placeholder="Enter your message"
              rows={4}
              styles={{
                "--input-padding-inline": "1rem",
                "--input-padding-block": "1rem",
                "--input-fs": "1rem",
                "--input-radius": "0.75rem",
                "--input-border": "1px solid #ccc",
                "--input-width": "100%",
              }}
            />
          </FormComponent.Field>
        </FormComponent>
      </div>

      {/* Custom select */}
      <div>
        <h4>Custom Select</h4>
        <FormComponent aria-label="Select example">
          <FormComponent.Field label="Country" labelFor="custom-country">
            <FormComponent.Select
              id="custom-country"
              name="country"
              styles={{
                "--input-padding-inline": "1.25rem",
                "--input-padding-block": "0.625rem",
                "--input-fs": "1rem",
                "--input-radius": "0.5rem",
                "--input-border": "2px solid #28a745",
                "--input-bg": "#f0f9f4",
              }}
            >
              <FormComponent.Select.Option value="">Select country</FormComponent.Select.Option>
              <FormComponent.Select.Option value="us">United States</FormComponent.Select.Option>
              <FormComponent.Select.Option value="ca">Canada</FormComponent.Select.Option>
              <FormComponent.Select.Option value="uk">United Kingdom</FormComponent.Select.Option>
            </FormComponent.Select>
          </FormComponent.Field>
        </FormComponent>
      </div>

      {/* Dark theme example */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <h4 style={{ color: "white", marginTop: 0 }}>Dark Theme Example</h4>
        <FormComponent aria-label="Dark theme form">
          <FormComponent.Field label="Email" labelFor="dark-email">
            <FormComponent.Input
              id="dark-email"
              name="email"
              type="email"
              placeholder="email@example.com"
              styles={{
                "--input-bg": "#2a2a2a",
                "--input-color": "#e5e7eb",
                "--input-border": "1px solid #4b5563",
                "--input-padding-inline": "1rem",
                "--input-padding-block": "0.75rem",
                "--input-radius": "0.5rem",
                "--input-focus-outline": "2px solid #3b82f6",
                "--placeholder-color": "#9ca3af",
              }}
            />
          </FormComponent.Field>
          <FormComponent.Field label="Comments" labelFor="dark-comments" style={{ marginTop: "1rem" }}>
            <FormComponent.Textarea
              id="dark-comments"
              name="comments"
              placeholder="Your feedback..."
              rows={3}
              styles={{
                "--input-bg": "#2a2a2a",
                "--input-color": "#e5e7eb",
                "--input-border": "1px solid #4b5563",
                "--input-padding-inline": "1rem",
                "--input-padding-block": "0.75rem",
                "--input-radius": "0.5rem",
                "--input-focus-outline": "2px solid #3b82f6",
                "--placeholder-color": "#9ca3af",
              }}
            />
          </FormComponent.Field>
        </FormComponent>
      </div>

      {/* Disabled state customization */}
      <div>
        <h4>Custom Disabled State</h4>
        <FormComponent aria-label="Disabled state example">
          <FormComponent.Field label="Disabled Input" labelFor="disabled-custom">
            <FormComponent.Input
              id="disabled-custom"
              name="disabled"
              disabled
              value="This input is disabled"
              styles={{
                "--input-disabled-bg": "#f5f5f5",
                "--input-disabled-opacity": "0.6",
                "--input-padding-inline": "1rem",
                "--input-padding-block": "0.75rem",
              }}
            />
          </FormComponent.Field>
        </FormComponent>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Available CSS Variables

### Base Properties
- \`--input-padding-inline\`: Horizontal padding (logical property)
- \`--input-padding-block\`: Vertical padding (logical property)
- \`--input-width\`: Input width
- \`--input-radius\`: Border radius
- \`--input-color\`: Text color
- \`--input-bg\`: Background color
- \`--input-border\`: Border style

### Typography (Approved Abbreviations)
- \`--input-fs\`: Font size

### Focus State Variables
- \`--input-focus-outline\`: Outline on focus
- \`--input-focus-outline-offset\`: Outline offset on focus

### Disabled State Variables
- \`--input-disabled-bg\`: Background color when disabled
- \`--input-disabled-opacity\`: Opacity when disabled

### Placeholder Variables
- \`--placeholder-fs\`: Placeholder font size
- \`--placeholder-color\`: Placeholder text color

### Migration from Old Names
- ❌ \`--input-px\` → ✅ \`--input-padding-inline\`
- ❌ \`--input-py\` → ✅ \`--input-padding-block\`
- ❌ \`--input-w\` → ✅ \`--input-width\`

## Usage Examples

### Custom Input
\`\`\`tsx
<Form.Input
  styles={{
    "--input-padding-inline": "1.5rem",
    "--input-padding-block": "0.75rem",
    "--input-fs": "1.125rem",
    "--input-radius": "0.5rem",
  }}
/>
\`\`\`

### Custom Focus State
\`\`\`tsx
<Form.Input
  styles={{
    "--input-focus-outline": "3px solid #0066cc",
    "--input-focus-outline-offset": "2px",
  }}
/>
\`\`\`

### Dark Theme Input
\`\`\`tsx
<Form.Input
  styles={{
    "--input-bg": "#2a2a2a",
    "--input-color": "#e5e7eb",
    "--input-border": "1px solid #4b5563",
    "--input-focus-outline": "2px solid #3b82f6",
  }}
/>
\`\`\`
        `,
      },
    },
  },
} as Story;
