
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/lib/placeholder-data";
import { Bug, Sparkles, Terminal } from "lucide-react";
import { useState, useTransition } from "react";
import { debugCode } from "@/app/actions";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/code-block";

export default function DebuggerPage() {
    const [code, setCode] = useState("function greet(name) {\n  console.log('Hello, ' + name);\n}");
    const [language, setLanguage] = useState("javascript");
    const [error, setError] = useState("SyntaxError: Missing semicolon.");
    
    const [result, setResult] = useState<{fixedCode: string, explanation: string} | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDebugCode = () => {
        startTransition(async () => {
            setResult(null);
            const res = await debugCode(code, language, error);
            if (!res.error) {
                setResult({ fixedCode: res.fixedCode, explanation: res.explanation });
            } else {
                setResult({ fixedCode: "Error", explanation: res.explanation });
            }
        });
    }

    const availableLanguages = languages;

  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] py-8 md:py-12 flex flex-col items-center justify-center isolate overflow-hidden">
       <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
            alt="Abstract debugging background"
            fill
            className="object-cover animate-ken-burns"
            data-ai-hint="abstract debugging background"
            priority
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
       </div>

      <div className="container relative">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
        >
          <Bug className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl animated-gradient-text bg-gradient-to-r from-primary via-accent to-primary">
            AI Code Debugger
          </h1>
          <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
            Paste your broken code, describe the problem, and let Aurix fix it for you.
          </p>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="bg-card/70 backdrop-blur-xl border-border/20 shadow-2xl shadow-primary/10">
              <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                          <CardTitle className="font-headline">Debugger</CardTitle>
                          <CardDescription>Enter your code and describe the error.</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <Select value={language} onValueChange={setLanguage}>
                              <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
                                  <SelectValue placeholder="Select Language" />
                              </SelectTrigger>
                              <SelectContent>
                                  {availableLanguages.map(lang => (
                                      <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                          <Button onClick={handleDebugCode} disabled={isPending} className="shadow-lg shadow-primary/20">
                              <Sparkles className="mr-2 h-4 w-4" />
                              {isPending ? "Debugging..." : "Debug Code"}
                          </Button>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="code-input">Your Code</Label>
                        <Textarea
                            id="code-input"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="function broken() { ... }"
                            className="h-80 font-code text-sm resize-none bg-background/70"
                            />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="error-input">Error Message / Problem Description</Label>
                        <Textarea
                            id="error-input"
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                            placeholder="Describe what's going wrong or paste an error message here."
                            className="h-80 font-code text-sm resize-none bg-background/70"
                            />
                    </div>
                  </div>
                  
                  {isPending && (
                    <div className="text-center p-8">
                      <p className="text-muted-foreground animate-pulse">Aurix is thinking...</p>
                    </div>
                  )}

                  {result && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                       <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label className="mb-2 block">Fixed Code</Label>
                            <CodeBlock code={result.fixedCode} language={language} className="h-full"/>
                          </div>
                          <div>
                            <Label className="mb-2 block">Explanation</Label>
                            <Card className="bg-muted/40 h-full shadow-inner">
                              <CardContent className="p-4">
                                <p className="text-sm whitespace-pre-wrap">{result.explanation}</p>
                              </CardContent>
                            </Card>
                          </div>
                       </div>
                    </motion.div>
                  )}
              </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
