"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  FileText,
  Folder,
  Plus,
  Search,
} from "lucide-react";

import { TreeNode } from "@/lib/wiki";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface WikiSidebarProps {
  tree: TreeNode[];
  currentPath?: string;
}

export function WikiSidebar({ tree, currentPath }: WikiSidebarProps) {
  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold leading-none">Avro Wiki</p>
            <p className="text-xs text-muted-foreground">Knowledge Base</p>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Page</span>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <SidebarInput placeholder="Quick search" className="pl-8" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarSeparator className="my-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {tree.map((node) => (
                <WikiTreeItem
                  key={node.path}
                  node={node}
                  currentPath={currentPath}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" size="sm" asChild>
          <Link href="/wiki/reference/glossary">Glossary</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/wiki">Back to index</Link>
        </Button>
      </SidebarFooter>
    </SidebarRoot>
  );
}

interface WikiTreeItemProps {
  node: TreeNode;
  currentPath?: string;
  depth?: number;
}

function WikiTreeItem({ node, currentPath, depth = 0 }: WikiTreeItemProps) {
  const containsActive = useMemo(() => {
    if (!currentPath) return false;
    if (node.type === "file") {
      return normalizePath(currentPath) === normalizePath(node.path);
    }
    return node.children?.some((child) =>
      nodeContainsPath(child, currentPath)
    );
  }, [node, currentPath]);

  if (node.type === "folder") {
    return (
      <FolderItem
        node={node}
        depth={depth}
        isActive={containsActive}
        currentPath={currentPath}
      />
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={containsActive} className="gap-2">
        <Link href={toWikiHref(node.path)}>
          <FileText className="size-4 shrink-0" />
          <span className="truncate">{formatLabel(node.name)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

interface FolderItemProps extends WikiTreeItemProps {
  isActive?: boolean;
}

function FolderItem({ node, depth = 0, isActive, currentPath }: FolderItemProps) {
  const [open, setOpen] = useState(isActive ?? true);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        className="gap-2 justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2">
          <Folder className="size-4" />
          <span className="truncate">{formatLabel(node.name)}</span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            open ? "rotate-0" : "-rotate-90"
          )}
        />
      </SidebarMenuButton>
      {open && node.children?.length ? (
        <div className="ml-1 mt-1 border-l border-sidebar-border pl-3">
          {node.children.map((child) => (
            <WikiTreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              currentPath={currentPath}
            />
          ))}
        </div>
      ) : null}
    </SidebarMenuItem>
  );
}

function nodeContainsPath(node: TreeNode, currentPath: string): boolean {
  if (node.type === "file") {
    return normalizePath(node.path) === normalizePath(currentPath);
  }
  return (
    node.path === currentPath ||
    node.children?.some((child) => nodeContainsPath(child, currentPath)) === true
  );
}

function normalizePath(path?: string) {
  return path?.replace(/^\/+|\/+$/g, "") ?? "";
}

function toWikiHref(path: string) {
  const normalized = normalizePath(path);
  return normalized === "index" ? "/wiki" : `/wiki/${normalized}`;
}

function formatLabel(label: string) {
  return label
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}