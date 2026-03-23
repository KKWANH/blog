'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string>()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(undefined)

    const formData = new FormData(event.currentTarget)
    const callbackUrl = searchParams.get('callbackUrl') ?? '/admin'
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
      callbackUrl,
    })

    setIsPending(false)

    if (!result || result.error) {
      setError('Invalid administrator credentials.')
      return
    }

    router.push(result.url ?? '/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="username" className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          maxLength={64}
          className="h-12 rounded-md border border-border bg-background/70 px-4 outline-none transition-colors focus:border-foreground"
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="password" className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={8}
          maxLength={128}
          className="h-12 rounded-md border border-border bg-background/70 px-4 outline-none transition-colors focus:border-foreground"
          required
        />
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex h-12 items-center justify-center rounded-md border border-foreground bg-foreground px-5 text-sm font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}
