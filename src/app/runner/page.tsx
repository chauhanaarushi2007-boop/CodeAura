"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/lib/placeholder-data";
import { Play } from "lucide-react";
import { useState, useTransition } from "react";
import { runCode } from "@/app/actions";
import { Label } from "@/components/ui/label";

export default function CodeRunnerPage() {
    const [output, setOutput] = useState("Your code output will appear here.");
    const [code, setCode] = useState("<h1>Hello, Language-MIA!</h1>\n<style>\n  h1 { color: blue; }\n</style>");
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
                        {languages.map(lang => (
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
                <Card className="bg-muted h-full">
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
    </div>
  );
}
