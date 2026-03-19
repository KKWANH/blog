import Link from 'next/link';
import type { ContentNode } from '@/lib/content';

export default function TreeList({ nodes }: { nodes: ContentNode[] }) {
  return (
    <ul className="space-y-2">
      {nodes.map((node) => {
        const href = '/' + node.slug.join('/');
        return (
          <li key={href}>
            {node.type === 'folder' ? (
              <div className="font-medium text-zinc-800 dark:text-zinc-200">{node.name}</div>
            ) : (
              <Link href={href} className="text-zinc-900 dark:text-zinc-100 hover:underline">
                {node.name}
              </Link>
            )}
            {node.children && node.children.length > 0 && (
              <div className="pl-4 mt-1 border-l border-zinc-200 dark:border-zinc-800">
                <TreeList nodes={node.children} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
