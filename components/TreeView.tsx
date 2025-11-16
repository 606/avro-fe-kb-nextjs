'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TreeNode } from '@/lib/wiki';

interface TreeViewProps {
  nodes: TreeNode[];
  currentPath?: string;
}

function TreeNodeComponent({ node, currentPath, level = 0 }: { node: TreeNode; currentPath?: string; level?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = currentPath === node.path;
  const indentClass = `pl-${level * 4}`;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 ${indentClass}`}
        >
          <span className="text-gray-500">
            {isOpen ? '▼' : '▶'}
          </span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {node.name}
          </span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child, index) => (
              <TreeNodeComponent
                key={index}
                node={child}
                currentPath={currentPath}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/wiki/${node.path}`}
      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${indentClass} ${
        isActive ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium' : 'text-gray-600 dark:text-gray-400'
      }`}
    >
      <span className="ml-6">{node.name}</span>
    </Link>
  );
}

export function TreeView({ nodes, currentPath }: TreeViewProps) {
  return (
    <div className="space-y-1">
      {nodes.map((node, index) => (
        <TreeNodeComponent key={index} node={node} currentPath={currentPath} />
      ))}
    </div>
  );
}
