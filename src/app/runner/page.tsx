
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
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2574&auto=format&fit=crop"
            alt="Abstract coding background"
            fill
            className="object-cover animate-ken-burns"
            data-ai-hint="abstract coding background"
            priority
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
       </div>

      <div className="container relative h-full flex flex-col">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
        >
          <Terminal className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl animated-gradient-text bg-gradient-to-r from-primary via-accent to-primary">
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
             className="flex-grow min-h-[500px]"
        >
          <Card className="bg-card/70 backdrop-blur-xl border-border/20 shadow-2xl shadow-primary/10 h-full flex flex-col">
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
              <CardContent className="flex-grow flex flex-col">
                <ResizablePanelGroup direction="vertical" className="flex-grow">
                    <ResizablePanel defaultSize={60}>
                         <Textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="console.log('Hello, CodeAura!');"
                            className="h-full w-full font-code text-sm resize-none bg-background/70"
                            />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={40}>
                       <Tabs defaultValue="output" className="h-full flex flex-col">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="output">Output</TabsTrigger>
                                <TabsTrigger value="input">Input (stdin)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="output" className="flex-grow">
                                {shouldRenderHtml ? (
                                    <iframe
                                        srcDoc={output}
                                        title="Code Output"
                                        sandbox="allow-scripts"
                                        className="w-full h-full border-0 bg-transparent rounded-b-lg"
                                    />
                                ) : (
                                    <pre className="font-code text-sm text-muted-foreground whitespace-pre-wrap p-4 h-full overflow-auto bg-muted/40 rounded-b-md">
                                        {output}
                                    </pre>
                                )}
                            </TabsContent>
                            <TabsContent value="input" className="flex-grow">
                                <Textarea
                                    id="input"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter input for your code here..."
                                    className="h-full font-code text-sm resize-none bg-muted/40 rounded-b-md"
                                />
                            </TabsContent>
                        </Tabs>
                    </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
