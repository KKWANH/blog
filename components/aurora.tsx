/**
 * Fixed-position animated mesh that sits behind every page on the new
 * kwanho.dev. Three blurred gradient blobs drift on independent
 * timelines; a faint SVG grain overlay keeps the gradient from banding
 * on flat OLED displays. All driven by CSS in app/globals.css.
 *
 * No JS, no IntersectionObserver — `prefers-reduced-motion` disables
 * the keyframes in the stylesheet.
 */
export function Aurora() {
  return (
    <div aria-hidden className="aurora">
      <span className="aurora__blob aurora__blob--a" />
      <span className="aurora__blob aurora__blob--b" />
      <span className="aurora__blob aurora__blob--c" />
      <span className="aurora__grain" />
    </div>
  )
}
