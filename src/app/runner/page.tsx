
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/lib/placeholder-data";
import { Play, Terminal } from "lucide-react";
import { useState, useTransition } from "react";
import { runCode } from "@/app/actions";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CodeRunnerPage() {
    const [output, setOutput] = useState("Your code output will appear here.");
    const [code, setCode] = useState("<h1>Hello, CodeAura!</h1>\n<style>\n  h1 { color: hsl(var(--primary)); }\n</style>");
    const [language, setLanguage] = useState("html");
    const [input, setInput] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleRunCode = () => {
        startTransition(async () => {
            setOutput("Running code...");
            const result = await runCode(code, language, input);
            setOutput(result.output);
        });
    }

    const shouldRenderHtml = ['html', 'css', 'php'].includes(language);
    const availableLanguages = languages;

  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] py-8 md:py-12 flex flex-col items-center justify-center isolate overflow-hidden">
       <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2532&auto=format&fit=crop"
            alt="Abstract coding background"
            fill
            className="object-cover animate-ken-burns"
            data-ai-hint="abstract coding background"
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
          <Terminal className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Live Code Runner
          </h1>
          <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
            Write, run, and test your code snippets instantly. No setup required.
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
                          <CardTitle className="font-headline">Code Editor</CardTitle>
                          <CardDescription>Select a language and start coding.</CardDescription>
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
                          <Button onClick={handleRunCode} disabled={isPending} className="shadow-lg shadow-primary/20">
                              <Play className="mr-2 h-4 w-4" />
                              {isPending ? "Running..." : "Run"}
                          </Button>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                      <Textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="console.log('Hello, CodeAura!');"
                          className="h-80 font-code text-sm resize-none bg-background/70"
                          />
                      <div>
                          <Label htmlFor="input" className="mb-2 block">Input (stdin)</Label>
                          <Textarea
                              id="input"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder="Enter input for your code here..."
                              className="h-32 font-code text-sm resize-none bg-background/70"
                              />
                      </div>
                  </div>
                  <div>
                      <Card className="bg-muted/40 h-full shadow-inner">
                          <CardHeader>
                              <CardTitle className="text-lg font-medium">Output</CardTitle>
                          </CardHeader>
                          <CardContent className="h-full p-0">
                              {shouldRenderHtml ? (
                                  <iframe
                                      srcDoc={output}
                                      title="Code Output"
                                      sandbox="allow-scripts"
                                      className="w-full h-full border-0 min-h-[440px] md:min-h-0 bg-transparent rounded-b-lg"
                                  />
                              ) : (
                                  <pre className="font-code text-sm text-muted-foreground whitespace-pre-wrap p-6 pt-0">{output}</pre>
                              )}
                          </CardContent>
                      </Card>
                  </div>
              </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
