"use client"

import * as React from "react"
import { Palette, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const accents = [
    { name: 'Blue', theme: 'theme-blue', color: 'hsl(210 90% 55%)' },
    { name: 'Teal', theme: 'theme-teal', color: 'hsl(170 80% 45%)' },
    { name: 'Orange', theme: 'theme-orange', color: 'hsl(25 95% 55%)' },
    { name: 'Magenta', theme: 'theme-magenta', color: 'hsl(320 100% 55%)' },
]

export function AccentSwitcher() {
  const [currentAccent, setCurrentAccent] = React.useState('theme-blue')

  React.useEffect(() => {
    // Remove other theme classes
    accents.forEach(accent => {
      document.body.classList.remove(accent.theme);
    });
    // Add the current theme class
    document.body.classList.add(currentAccent);
  }, [currentAccent]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change accent color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {accents.map((accent) => (
            <DropdownMenuItem key={accent.theme} onClick={() => setCurrentAccent(accent.theme)}>
                <div className="w-5 h-5 rounded-full mr-2" style={{ backgroundColor: accent.color }}></div>
                <span>{accent.name}</span>
                {currentAccent === accent.theme && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
