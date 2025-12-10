"use client"

import * as React from "react"
import { Palette, Sun, Moon, Sparkles, Waves } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
    { name: 'Light', theme: 'light', icon: Sun },
    { name: 'Oceanic Deep', theme: 'oceanic-deep', icon: Waves },
    { name: 'Aurora Borealis', theme: 'aurora-borealis', icon: Sparkles },
    { name: 'Synthwave Neon', theme: 'synthwave-neon', icon: Moon },
]

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
            <DropdownMenuItem key={theme.theme} onClick={() => setTheme(theme.theme)}>
                <theme.icon className="mr-2 h-4 w-4" />
                <span>{theme.name}</span>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
