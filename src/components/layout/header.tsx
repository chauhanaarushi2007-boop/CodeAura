
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, CodeXml } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { AccentSwitcher } from "../accent-switcher";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/tutorials", label: "Tutorials" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/runner", label: "Code Runner" },
  { href: "/references", label: "References" },
  { href: "/certificates", label: "Certificates" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              CodeAura
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  pathname.startsWith(link.href) ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 shadow-2xl shadow-primary/20 border-r-primary/20">
              <SheetHeader className="pr-6">
                <SheetTitle asChild>
                  <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <CodeXml className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-2xl">CodeAura</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mt-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg transition-colors hover:bg-muted py-3 px-6 rounded-l-full",
                        pathname.startsWith(link.href) ? "text-primary font-semibold bg-primary/10" : "text-foreground/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="flex-1 md:hidden">
             <Link href="/" className="flex items-center justify-center space-x-2">
                <CodeXml className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">CodeAura</span>
              </Link>
           </div>
          <AccentSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
