import { TreeView } from './TreeView';
import { TreeNode } from '@/lib/wiki';

interface SidebarProps {
  tree: TreeNode[];
  currentPath?: string;
}

export function Sidebar({ tree, currentPath }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto sticky top-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Wiki</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Knowledge Base</p>
      </div>
      <nav className="py-4">
        <TreeView nodes={tree} currentPath={currentPath} />
      </nav>
    </aside>
  );
}
