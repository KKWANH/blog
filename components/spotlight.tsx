'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'

type SpotlightProps = {
  as?: 'div' | 'section' | 'article' | 'a'
  href?: string
  target?: string
  rel?: string
  /** CSS color (or var(...)). Drives the spotlight + card glow tint. */
  color?: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Wraps any container and updates --mx / --my on pointer movement so
 * the `.spotlight` and `.card-glow` styles in globals.css can render a
 * mouse-following highlight. Pointer math is kept cheap; we set the CSS
 * variables directly on the element rather than through React state.
 */
export function Spotlight({
  as = 'div',
  color,
  className = '',
  style,
  children,
  ...rest
}: SpotlightProps) {
  const ref = useRef<HTMLElement>(null)

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  const mergedStyle: CSSProperties = {
    ...(color ? ({ ['--spotlight-color' as string]: color } as CSSProperties) : null),
    ...style,
  }

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      onPointerMove={onMove}
      className={`spotlight ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}
