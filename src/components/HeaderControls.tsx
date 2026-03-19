'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ThemeToggle from '@/components/ThemeToggle';
import type { ContentNode } from '@/lib/content';

function DrawerTree({
  nodes,
  onNavigate,
}: {
  nodes: ContentNode[];
  onNavigate: () => void;
}) {
  return (
    <ul className="drawer-tree">
      {nodes.map((node) => {
        const href = '/' + node.slug.join('/');
        return (
          <li key={href}>
            {node.type === 'folder' ? (
              <div className="drawer-tree__folder">{node.name}</div>
            ) : (
              <Link href={href} className="drawer-tree__link" onClick={onNavigate}>
                {node.name}
              </Link>
            )}
            {node.children && node.children.length > 0 && (
              <div className="drawer-tree__children">
                <DrawerTree nodes={node.children} onNavigate={onNavigate} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function HeaderControls({ tree }: { tree: ContentNode[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const drawer = (
    <>
      <div className={`drawer-backdrop${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer-panel${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer-panel__header">
          <div>
            <p className="drawer-panel__eyebrow">Journal Index</p>
            <p className="drawer-panel__title">All posts and folders</p>
          </div>
          <button
            type="button"
            className="menu-button"
            aria-label="Close navigation panel"
            onClick={() => setOpen(false)}
          >
            <X size={20} strokeWidth={1.9} />
          </button>
        </div>
        <div className="drawer-panel__body">
          <DrawerTree nodes={tree} onNavigate={() => setOpen(false)} />
        </div>
      </aside>
    </>
  );

  return (
    <>
      <div className="header-controls">
        <button
          type="button"
          className="menu-button"
          aria-label={open ? 'Close navigation panel' : 'Open navigation panel'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.9} /> : <Menu size={20} strokeWidth={1.9} />}
        </button>
        <ThemeToggle />
      </div>
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
