import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Header,
  Main,
  Footer,
  Aside,
  Section,
  Article,
  Fieldset,
} from './landmarks';

/**
 * Landmarks wrap semantic HTML5 elements (header, main, footer, aside,
 * section, article, fieldset) so consumers get accessible structure without
 * hand-authoring the tags. Tests focus on: (1) the correct element renders,
 * (2) children pass through, (3) props forward to the DOM, (4) ARIA roles
 * are exposed correctly by the semantic element.
 */

describe('Layout landmarks', () => {
  describe('Header', () => {
    it('renders a <header> with banner role by default', () => {
      render(
        <Header>
          <span>Site header</span>
        </Header>
      );
      const banner = screen.getByRole('banner');
      expect(banner.tagName).toBe('HEADER');
      expect(banner).toHaveTextContent('Site header');
    });

    it('renders optional headerBackground before content', () => {
      render(
        <Header headerBackground={<div data-testid="bg">bg</div>}>
          Hello
        </Header>
      );
      const bg = screen.getByTestId('bg');
      expect(bg).toBeInTheDocument();
      // background must precede the inner section in source order
      expect(bg.nextElementSibling?.tagName).toBe('SECTION');
    });
  });

  describe('Main', () => {
    it('renders a <main> with main role', () => {
      render(<Main>Content</Main>);
      const main = screen.getByRole('main');
      expect(main.tagName).toBe('MAIN');
      expect(main).toHaveTextContent('Content');
    });
  });

  describe('Footer', () => {
    it('renders a <footer> with contentinfo role', () => {
      render(<Footer>Footer</Footer>);
      expect(screen.getByRole('contentinfo').tagName).toBe('FOOTER');
    });
  });

  describe('Aside', () => {
    it('renders an <aside> with complementary role', () => {
      render(<Aside>Sidebar</Aside>);
      expect(screen.getByRole('complementary').tagName).toBe('ASIDE');
    });
  });

  describe('Section', () => {
    // <section> only exposes role="region" when labelled, so we test via
    // the tag name for the unlabelled case and the role for the labelled case.
    it('renders a <section> element', () => {
      const { container } = render(<Section>A</Section>);
      expect(container.querySelector('section')).not.toBeNull();
    });

    it('exposes region role when given an accessible name', () => {
      render(<Section aria-label="Featured">Content</Section>);
      expect(screen.getByRole('region', { name: 'Featured' })).toBeInTheDocument();
    });
  });

  describe('Article', () => {
    it('renders an <article> with article role', () => {
      render(<Article>Post</Article>);
      expect(screen.getByRole('article').tagName).toBe('ARTICLE');
    });
  });

  describe('Fieldset', () => {
    it('renders a <fieldset> element', () => {
      const { container } = render(<Fieldset>A</Fieldset>);
      expect(container.querySelector('fieldset')).not.toBeNull();
    });

    it('groups form controls with a legend for screen readers', () => {
      render(
        <Fieldset>
          <legend>Shipping</legend>
          <input aria-label="street" />
        </Fieldset>
      );
      // fieldset + legend creates an accessible group named "Shipping"
      expect(screen.getByRole('group', { name: 'Shipping' })).toBeInTheDocument();
    });
  });

  describe('prop forwarding', () => {
    it('forwards className, id, and arbitrary attributes to the root element', () => {
      const { container } = render(
        <Main id="page" classes="wrap" data-testid="main-el">
          Body
        </Main>
      );
      const main = container.querySelector('main');
      expect(main).toHaveAttribute('id', 'page');
      expect(main).toHaveAttribute('class', 'wrap');
      expect(main).toHaveAttribute('data-testid', 'main-el');
    });
  });
});
