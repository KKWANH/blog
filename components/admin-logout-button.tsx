'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function AdminLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="inline-flex items-center gap-3 border border-border px-3 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign Out</span>
    </button>
  )
}
