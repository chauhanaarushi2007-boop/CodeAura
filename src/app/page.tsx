
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Bot, ListChecks, Terminal } from "lucide-react";
import Link from "next/link";
import { LanguageIcon } from "@/components/icons/language-icons";
import { languages } from "@/lib/placeholder-data";
import { AnimatedIconBackground } from "@/components/animated-icon-background";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-20 md:py-24 lg:py-32 relative overflow-hidden">
        <AnimatedIconBackground />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-extrabold tracking-tighter sm:text-7xl xl:text-8xl/none animated-gradient-text bg-gradient-to-r from-primary via-accent to-primary">
                CodeAura
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The Aura of Programmers Begins Here. Skill that Sparks a Career.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary))] transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary))]">
                <Link href="/tutorials">
                  Start Learning Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Learn Smarter, Not Harder</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                CodeAura provides you with all the tools you need to succeed in your programming journey, from beginner to pro.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
            <Card className={cn("glow-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1")}>
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                    <BookOpen className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline">Comprehensive Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dive deep into any language with our curated and easy-to-understand tutorials.</p>
              </CardContent>
            </Card>
            <Card className={cn("glow-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1")}>
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                    <ListChecks className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline">Interactive Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Test your knowledge and solidify your understanding with our interactive quizzes.</p>
              </CardContent>
            </Card>
            <Card className={cn("glow-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1")}>
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                    <Terminal className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline">Live Code Runner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Execute code snippets directly in your browser. No setup required.</p>
              </CardContent>
            </Card>
            <Card className={cn("glow-card transition-all duration-300 hover:border-primary/50 hover:-translate-y-1")}>
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                    <Bot className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline">AI Assistant 'Aurix'</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get instant help from Aurix, your personal AI programming assistant.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="languages" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Explore Our Languages</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From web development to data science, we've got you covered.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
            {languages.map((lang) => (
              <Link key={lang.id} href="/tutorials" className="flex flex-col items-center justify-center space-y-2 group">
                  <LanguageIcon language={lang.id} className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-110" />
                  <span className="text-lg font-medium group-hover:text-primary transition-colors">{lang.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
