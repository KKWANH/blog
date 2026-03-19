import Link from 'next/link';
import type { ContentNode } from '@/lib/content';

export default function TreeList({ nodes }: { nodes: ContentNode[] }) {
  return (
    <ul className="tree-list">
      {nodes.map((node) => {
        const href = '/' + node.slug.join('/');
        return (
          <li key={href}>
            {node.type === 'folder' ? (
              <div className="tree-list__folder">{node.name}</div>
            ) : (
              <Link href={href} className="tree-list__link">
                {node.name}
              </Link>
            )}
            {node.children && node.children.length > 0 && (
              <div className="tree-list__children">
                <TreeList nodes={node.children} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
