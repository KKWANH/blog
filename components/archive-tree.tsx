import Link from 'next/link'
import type { ContentTreeNode } from '@/lib/content'
import {
  ArchiveBranch,
  ArchiveChildren,
  ArchiveFolder,
  ArchivePageLink,
  ArchiveTreeWrap,
} from '@/components/styled/archive.styles'

function ArchiveTreeBranch({ nodes }: { nodes: ContentTreeNode[] }) {
  return (
    <ArchiveTreeWrap>
      {nodes.map((node) => {
        const hasChildren = Boolean(node.children?.length)

        if (node.type === 'folder') {
          return (
            <ArchiveBranch key={node.href}>
              <ArchiveFolder>{node.label}</ArchiveFolder>
              {hasChildren ? (
                <ArchiveChildren>
                  <ArchiveTreeBranch nodes={node.children ?? []} />
                </ArchiveChildren>
              ) : null}
            </ArchiveBranch>
          )
        }

        return (
          <ArchiveBranch key={node.href}>
            <ArchivePageLink as={Link} href={node.href}>
              {node.label}
            </ArchivePageLink>
            {hasChildren ? (
              <ArchiveChildren>
                <ArchiveTreeBranch nodes={node.children ?? []} />
              </ArchiveChildren>
            ) : null}
          </ArchiveBranch>
        )
      })}
    </ArchiveTreeWrap>
  )
}

export function ArchiveTree({ nodes }: { nodes: ContentTreeNode[] }) {
  if (!nodes.length) {
    return null
  }

  return <ArchiveTreeBranch nodes={nodes} />
}
