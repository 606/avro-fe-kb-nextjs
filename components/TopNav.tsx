"use client";

import Link from "next/link";
import {
  BookMarked,
  Compass,
  Github,
  LifeBuoy,
  NotebookPen,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopNav() {
  return (
    <header className="border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <span className="text-sm font-semibold text-muted-foreground">
            Knowledge Base
          </span>
        </div>
        <NavigationMenu className="hidden flex-1 md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[340px] gap-4 p-4">
                  <Link
                    href="/wiki/getting-started/introduction"
                    className="flex flex-col gap-1 rounded-lg border p-4 hover:bg-muted"
                  >
                    <span className="text-sm font-semibold">Getting Started</span>
                    <span className="text-sm text-muted-foreground">
                      Learn how to navigate and contribute to Avro Wiki.
                    </span>
                  </Link>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Link href="/wiki/guides/authoring-content" className="rounded-md border p-3 hover:bg-muted">
                      Authoring Guide
                    </Link>
                    <Link href="/wiki/reference/api" className="rounded-md border p-3 hover:bg-muted">
                      API Reference
                    </Link>
                    <Link href="/wiki/reference/glossary" className="rounded-md border p-3 hover:bg-muted">
                      Glossary
                    </Link>
                    <Link href="/wiki/getting-started/faq" className="rounded-md border p-3 hover:bg-muted">
                      FAQ
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[320px] gap-2 p-4 text-sm">
                  <NavigationMenuLink asChild>
                    <Link href="https://github.com/606/avro-fe-kb-nextjs" target="_blank" className="rounded-md border p-3 hover:bg-muted">
                      <Github className="mr-2 inline size-4" />
                      Repository
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/wiki/guides/how-to-use" className="rounded-md border p-3 hover:bg-muted">
                      <BookMarked className="mr-2 inline size-4" />
                      Usage Guide
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/wiki/reference/api" className="rounded-md border p-3 hover:bg-muted">
                      <Compass className="mr-2 inline size-4" />
                      API Surface
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="gap-2">
            <NotebookPen className="size-4" />
            Create Note
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="size-4" />
                <span className="sr-only">Open quick menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/wiki/guides/how-to-use">Documentation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://github.com/606/avro-fe-kb-nextjs" target="_blank">
                  GitHub Repo
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 size-4" />
                Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
