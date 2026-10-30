// Gesture physics shared by the travel sheet and the photo viewer, after Apple's
// "Designing Fluid Interfaces": springs in damping-ratio + response terms, momentum
// projection, rubber-banding and release velocity from a short pointer history.

export type Spring = { damping: number; response: number }
/** Critically damped: the default for anything that settles. */
export const SETTLE: Spring = { damping: 1, response: 0.35 }
/** A little overshoot, only after a gesture that carried momentum. */
export const THROWN: Spring = { damping: 0.8, response: 0.3 }

/** Where a flick comes to rest, using the scroll-deceleration curve (UIScrollView normal rate). */
export function project(velocity: number, rate = 0.998) {
  return (velocity / 1000) * rate / (1 - rate)
}

/** Progressive resistance past a boundary: the further out, the less it follows. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

export type Sample = { position: number; time: number }
/** px/s over the last few moves; zero when the pointer rested before release. */
export function releaseVelocity(history: Sample[], releasedAt: number) {
  const first = history[0], last = history[history.length - 1]
  const span = first && last ? last.time - first.time : 0
  return span > 0 && releasedAt - last.time < 80 ? ((last.position - first.position) / span) * 1000 : 0
}

/** Damped harmonic oscillator (unit mass) on the display clock. `update` may return false to stop early. Returns a cancel function. */
export function springTo(from: number, to: number, velocity: number, spring: Spring, update: (value: number) => void | boolean, done?: () => void) {
  const stiffness = (2 * Math.PI / spring.response) ** 2
  const friction = 4 * Math.PI * spring.damping / spring.response
  let value = from, speed = velocity, last = 0, frame = 0
  const tick = (time: number) => {
    const elapsed = Math.min((time - (last || time - 16)) / 1000, 0.064)
    last = time
    for (let step = 0; step < 4; step++) {
      const dt = elapsed / 4
      speed += (-stiffness * (value - to) - friction * speed) * dt
      value += speed * dt
    }
    if (Math.abs(value - to) < 0.5 && Math.abs(speed) < 5) { update(to); frame = 0; done?.(); return }
    if (update(value) === false) { frame = 0; return }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
