import { THEME_STORAGE_KEY } from './theme-provider';

/**
 * Returns a string containing an IIFE to inject in the document `<head>`
 * before any styles or React code loads. It reads the stored theme
 * preference (or falls back to prefers-color-scheme) and sets
 * `data-theme` on `<html>` synchronously, so consumers never see a
 * flash of the wrong theme before ThemeProvider hydrates.
 *
 * Usage (Next.js, Astro, Remix, or hand-rolled SSR):
 *
 *   <head>
 *     <script
 *       dangerouslySetInnerHTML={{ __html: getThemeFoucScript() }}
 *     />
 *   </head>
 *
 * The script is intentionally small (<500 bytes) so it doesn't hurt LCP.
 */
export function getThemeFoucScript(storageKey: string = THEME_STORAGE_KEY): string {
  // The script body is a single expression so a minifier can inline it verbatim.
  // It deliberately avoids optional chaining and nullish coalescing to stay
  // compatible with older SSR targets that don't transpile inline <script> blocks.
  return `
(function(){
  try {
    var k = ${JSON.stringify(storageKey)};
    var s = window.localStorage.getItem(k);
    var t = (s === 'light' || s === 'dark')
      ? s
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
  } catch (_) {}
})();
`.trim();
}
