'use client'

export async function ownerSignOut(token: string, purpose: 'travel' | 'skills', destination: '/travel' | '/about') {
  const response = await fetch('/api/owner/logout', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-owner-csrf': token }, body: JSON.stringify({ purpose }), credentials: 'same-origin' })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error ?? 'Sign-out could not be confirmed.')
  window.location.assign(destination)
}
