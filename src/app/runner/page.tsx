
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/lib/placeholder-data";
import { Play, Terminal, Bug } from "lucide-react";
import { useState, useTransition } from "react";
import { runCode, debugCode } from "@/app/actions";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Label } from "@/components/ui/label";

type RunResult = {
  output: string;
  isError: boolean;
};

type DebugResult = {
    fixedCode: string;
    explanation: string;
};

export default function CodeRunnerPage() {
    const [runResult, setRunResult] = useState<RunResult>({ output: "Your code output will appear here.", isError: false});
    const [debugResult, setDebugResult] = useState<DebugResult | null>(null);
    const [code, setCode] = useState("<h1>Hello, CodeAura!</h1>\n<style>\n  h1 { color: hsl(var(--primary)); }\n</style>");
    const [language, setLanguage] = useState("html");
    const [input, setInput] = useState("");
    
    const [isRunPending, startRunTransition] = useTransition();
    const [isDebugPending, startDebugTransition] = useTransition();

    const handleDebugCode = (errorOutput: string = "The user wants me to find and fix any bugs or mistakes in this code.") => {
        startDebugTransition(async () => {
            setDebugResult(null); // Clear previous debug result while fetching new one
            const result = await debugCode(code, language, errorOutput);
             if (!result.error) {
                setDebugResult({ fixedCode: result.fixedCode, explanation: result.explanation });
            } else {
                 setDebugResult({ fixedCode: "Error", explanation: result.explanation });
            }
        });
    }

    const handleRunCode = () => {
        startRunTransition(async () => {
            setDebugResult(null); 
            setRunResult({ output: "Running code...", isError: false });
            const result = await runCode(code, language, input);
            
            // If the code runs and an error is detected, automatically trigger the debugger
            if (result.isError) {
                setRunResult(result); // Show the error briefly while debugger runs
                startDebugTransition(async () => {
                    const debug_result = await debugCode(code, language, result.output);
                     if (!debug_result.error) {
                        setDebugResult({ fixedCode: debug_result.fixedCode, explanation: debug_result.explanation });
                    } else {
                         setDebugResult({ fixedCode: "Error", explanation: debug_result.explanation });
                    }
                });
            } else {
                setRunResult(result);
            }
        });
    }
    
    const handleUseFix = () => {
        if(debugResult) {
            setCode(debugResult.fixedCode);
            setDebugResult(null);
            // Optionally clear the run result to avoid confusion
            setRunResult({ output: "Code updated. Ready to run again.", isError: false });
        }
    }

    const shouldRenderHtml = ['html', 'css', 'php'].includes(language);
    const availableLanguages = languages;
    const isLoading = isRunPending || isDebugPending;

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

      <div className="container relative h-full flex flex-col flex-grow">
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
            Write, run, test, and debug your code snippets instantly.
          </p>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7, delay: 0.2 }}
             className="flex-grow flex flex-col"
        >
          <Card className="bg-card/70 backdrop-blur-xl border-border/20 shadow-2xl shadow-primary/10 h-full flex flex-col flex-grow">
              <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                          <CardTitle className="font-headline">Code Editor</CardTitle>
                          <CardDescription>Select a language and start coding.</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <Select value={language} onValueChange={(val) => { setLanguage(val); setDebugResult(null); setRunResult({output: "Your code output will appear here.", isError: false})}}>
                              <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
                                  <SelectValue placeholder="Select Language" />
                              </SelectTrigger>
                              <SelectContent>
                                  {availableLanguages.map(lang => (
                                      <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                           <div className="flex gap-2">
                                <Button onClick={handleRunCode} disabled={isLoading} className="flex-1 shadow-lg shadow-primary/20">
                                    <Play className="mr-2 h-4 w-4" />
                                    {isRunPending ? "Running..." : "Run"}
                                </Button>
                                <Button onClick={() => handleDebugCode()} disabled={isLoading} variant="outline" className="flex-1">
                                    <Bug className="mr-2 h-4 w-4"/>
                                    {isDebugPending ? "Debugging..." : "Debug"}
                                </Button>
                           </div>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ResizablePanelGroup direction="vertical" className="flex-grow min-h-[600px]">
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
                            <div className="flex items-center">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="output">Output</TabsTrigger>
                                    <TabsTrigger value="input">Input (stdin)</TabsTrigger>
                                </TabsList>
                            </div>
                            <CardDescription className="text-xs text-muted-foreground p-2 text-center">
                              For languages like C, Java, or Python, type your input in the &quot;Input (stdin)&quot; tab before running.
                            </CardDescription>
                            <TabsContent value="output" className="flex-grow flex flex-col">
                                <AnimatePresence mode="wait">
                                {isLoading ? (
                                     <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex-grow flex items-center justify-center">
                                        <p className="text-muted-foreground animate-pulse">{isRunPending ? "Running..." : "Debugging..."}</p>
                                     </motion.div>
                                ) : debugResult && debugResult.fixedCode !== 'Error' ? (
                                    <motion.div 
                                        key="debug"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-4 pt-4 flex-grow overflow-auto"
                                      >
                                        <div className="grid md:grid-cols-2 gap-4 h-full">
                                            <div className="flex flex-col gap-2">
                                                <Label>Suggested Fix</Label>
                                                <div className="relative flex-grow">
                                                  <CodeBlock code={debugResult.fixedCode} language={language} className="h-full"/>
                                                  <Button size="sm" className="absolute bottom-2 right-2" onClick={handleUseFix}>
                                                      Use This Code
                                                  </Button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label>Explanation</Label>
                                                <Card className="bg-muted/40 h-full shadow-inner flex-grow">
                                                <CardContent className="p-4 text-sm whitespace-pre-wrap overflow-y-auto h-full">
                                                    {debugResult.explanation}
                                                </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : shouldRenderHtml && !runResult.isError ? (
                                    <motion.div key="html" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex-grow">
                                        <iframe
                                            srcDoc={runResult.output}
                                            title="Code Output"
                                            sandbox="allow-scripts"
                                            className="w-full h-full border-0 bg-transparent rounded-b-lg"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.pre key="text" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`font-code text-sm whitespace-pre-wrap p-4 h-full overflow-auto bg-muted/40 rounded-b-md ${runResult.isError ? 'text-destructive' : 'text-muted-foreground'}`}>
                                        {runResult.output}
                                    </motion.pre>
                                )}
                                </AnimatePresence>
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

    