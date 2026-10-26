'use client'

import { useEffect, useRef, useState } from 'react'

export function CopyText({
  text,
  label,
  success = 'Copied.',
  failure = 'Could not copy. You can select and copy the text.',
  progress = 'Copying…',
}: {
  text: string
  label: string
  success?: string
  failure?: string
  progress?: string
}) {
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const inFlight = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function copy() {
    if (inFlight.current) return
    inFlight.current = true
    if (timer.current) clearTimeout(timer.current)
    setPending(true)
    setMessage(progress)
    try {
      await navigator.clipboard.writeText(text)
      setMessage(success)
    } catch {
      setMessage(failure)
    } finally {
      inFlight.current = false
      setPending(false)
    }
    timer.current = setTimeout(() => setMessage(''), 5000)
  }

  return (
    <div className="copy-email">
      <button type="button" onClick={copy} aria-disabled={pending}>{pending ? 'Copying…' : label}</button>
      <span role="status" aria-atomic="true">{message}</span>
    </div>
  )
}

export function CopyEmail({ email }: { email: string }) {
  return <CopyText text={email} label="Copy email address" success="Email address copied." failure="Could not copy. You can use the email link." progress="Copying email address…" />
}
