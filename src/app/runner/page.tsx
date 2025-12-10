
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/lib/placeholder-data";
import { Play, Lightbulb } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { runAndDebugCode } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/ui/code-block";

type DebugOutput = {
    hasError: boolean;
    errorLine?: number;
    explanation?: string;
    correctedCode?: string;
} | null;

export default function CodeRunnerPage() {
    const [output, setOutput] = useState("Your code output will appear here.");
    const [code, setCode] = useState("<h1>Hello, Language-MIA!</h1>\n<style>\n  h1 { color: hsl(var(--primary)); }\n</style>");
    const [language, setLanguage] = useState("html");
    const [input, setInput] = useState("");
    const [debugInfo, setDebugInfo] = useState<DebugOutput>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (debugInfo && debugInfo.hasError) {
            setIsDialogOpen(true);
        }
    }, [debugInfo]);

    const handleRunCode = () => {
        startTransition(async () => {
            setOutput("Running code...");
            setDebugInfo(null);
            setIsDialogOpen(false);
            const result = await runAndDebugCode(code, language, input);
            setOutput(result.runOutput.output);
            if (result.debugOutput) {
                setDebugInfo(result.debugOutput);
            }
        });
    }

    const applyFix = () => {
        if (debugInfo?.correctedCode) {
            setCode(debugInfo.correctedCode);
        }
        setIsDialogOpen(false);
        setDebugInfo(null);
    }
    
    const onDialogClose = (open: boolean) => {
        if (!open) {
            setIsDialogOpen(false);
            setDebugInfo(null);
        }
    }

    const shouldRenderHtml = ['html', 'css', 'php'].includes(language);
    const availableLanguages = languages;

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Live Code Runner
        </h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Write, run, and test your code snippets instantly. No setup required.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Code Editor</CardTitle>
                    <CardDescription>Select a language and start coding.</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableLanguages.map(lang => (
                                <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleRunCode} disabled={isPending}>
                        <Play className="mr-2 h-4 w-4" />
                        {isPending ? "Running..." : "Run"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="console.log('Hello, Language-MIA!');"
                        className="h-80 font-code text-sm resize-none"
                        />
                    <div>
                        <Label htmlFor="input" className="mb-2 block">Input (stdin)</Label>
                        <Textarea
                            id="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter input for your code here..."
                            className="h-32 font-code text-sm resize-none"
                            />
                    </div>
                </div>
                <div>
                    <Card className="bg-muted/50 h-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">Output</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full p-0">
                            {shouldRenderHtml ? (
                                <iframe
                                    srcDoc={output}
                                    title="Code Output"
                                    sandbox="allow-scripts"
                                    className="w-full h-full border-0"
                                />
                            ) : (
                                <pre className="font-code text-sm text-muted-foreground whitespace-pre-wrap p-6 pt-0">{output}</pre>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>

        {isPending && !debugInfo && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Lightbulb className="h-5 w-5 animate-pulse" />
                <span>Analyzing code for errors...</span>
            </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="font-headline flex items-center gap-2 text-2xl">
                        <Lightbulb className="text-primary h-6 w-6" />
                        Code Diagnosis
                    </DialogTitle>
                    <DialogDescription>
                        The AI has detected an issue in your code. Here's a breakdown and a suggested fix.
                    </DialogDescription>
                </DialogHeader>
                {debugInfo && debugInfo.hasError && (
                    <div className="space-y-4 py-4">
                        <div>
                            <h3 className="font-semibold mb-2">Explanation</h3>
                            <p className="text-sm text-muted-foreground">
                                {debugInfo.errorLine && <span className="font-bold text-destructive">Error on line {debugInfo.errorLine}: </span>}
                                {debugInfo.explanation}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Suggested Fix</h3>
                            <CodeBlock code={debugInfo.correctedCode || ''} language={language} />
                        </div>
                    </div>
                )}
                <DialogFooter>
                     <Button variant="outline" onClick={() => onDialogClose(false)}>Close</Button>
                     <Button onClick={applyFix}>Apply Fix</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
