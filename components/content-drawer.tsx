'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import type { ContentTreeNode } from '@/lib/content'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import styles from '@/components/content-drawer.module.css'

function ContentTree({
  currentPath,
  nodes,
}: {
  currentPath: string
  nodes: ContentTreeNode[]
}) {
  return (
    <div className={styles.tree}>
      {nodes.map((node) => {
        const isActive = currentPath === node.href
        const hasChildren = Boolean(node.children?.length)

        if (node.type === 'folder') {
          return (
            <div key={node.href} className={styles.branch}>
              <div className={styles.folder}>{node.label}</div>
              {hasChildren ? (
                <div className={styles.children}>
                  <ContentTree currentPath={currentPath} nodes={node.children ?? []} />
                </div>
              ) : null}
            </div>
          )
        }

        return (
          <div key={node.href} className={styles.branch}>
            <SheetClose asChild>
              <Link
                href={node.href}
                className={`${styles.pageLink}${isActive ? ` ${styles.pageLinkActive}` : ''}`}
              >
                <span className={`${styles.pageDot}${isActive ? '' : ` ${styles.pageDotMuted}`}`} />
                <span>{node.label}</span>
              </Link>
            </SheetClose>
            {hasChildren ? (
              <div className={styles.children}>
                <ContentTree currentPath={currentPath} nodes={node.children ?? []} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function HeaderControls({ tree }: { tree: ContentTreeNode[] }) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <button type="button" className={styles.trigger} aria-label="Open content index">
            <Menu className="h-4 w-4" />
            <span className={styles.triggerLabel}>Contents</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className={styles.sheet}>
          <SheetHeader className={styles.header}>
            <SheetTitle className={styles.title}>Content Index</SheetTitle>
            <SheetDescription>
              Pages discovered automatically from the <code>contents/</code> tree.
            </SheetDescription>
          </SheetHeader>
          <div className={styles.body}>
            <ContentTree currentPath={pathname} nodes={tree} />
          </div>
          <div className={styles.meta}>
            <p>Each page lives in <code>[name]/index.md</code> or <code>[name]/index.tsx</code>.</p>
            <p>Folder-local assets are served from <code>_media/</code>.</p>
          </div>
        </SheetContent>
      </Sheet>

      {mounted ? (
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="p-1 hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      ) : null}
    </div>
  )
}
