import '@testing-library/jest-dom'

import matchers from '@testing-library/jest-dom/matchers';
import { expect, beforeAll } from 'vitest';

expect.extend(matchers);

// Mock native <dialog> element methods for testing
// JSDOM doesn't support HTMLDialogElement methods yet
beforeAll(() => {
  if (typeof HTMLDialogElement === 'undefined') {
    // HTMLDialogElement not available at all in this environment
     
    global.HTMLDialogElement = class HTMLDialogElement extends HTMLElement {
      open = false;

      showModal() {
        this.open = true;
        this.setAttribute('open', '');
      }

      show() {
        this.open = true;
        this.setAttribute('open', '');
      }

      close() {
        this.open = false;
        this.removeAttribute('open');
      }
    } as unknown as typeof window.HTMLDialogElement;
  } else {
    // HTMLDialogElement exists but methods aren't implemented
    HTMLDialogElement.prototype.showModal =
      HTMLDialogElement.prototype.showModal ||
      function showModal(this: HTMLDialogElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).open = true;
        this.setAttribute('open', '');
      };

    HTMLDialogElement.prototype.show =
      HTMLDialogElement.prototype.show ||
      function show(this: HTMLDialogElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).open = true;
        this.setAttribute('open', '');
      };

    HTMLDialogElement.prototype.close =
      HTMLDialogElement.prototype.close ||
      function close(this: HTMLDialogElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).open = false;
        this.removeAttribute('open');
      };
  }
});
