"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/lib/placeholder-data";
import { Play } from "lucide-react";
import { useState, useTransition } from "react";
import { runCode } from "@/app/actions";

export default function CodeRunnerPage() {
    const [output, setOutput] = useState("Your code output will appear here.");
    const [code, setCode] = useState("console.log('Hello, Language-MIA!');");
    const [language, setLanguage] = useState("javascript");
    const [isPending, startTransition] = useTransition();

    const handleRunCode = () => {
        startTransition(async () => {
            setOutput("Running code...");
            const result = await runCode(code, language);
            setOutput(result.output);
        });
    }

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
            <div>
                 <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="console.log('Hello, Language-MIA!');"
                    className="h-80 font-code text-sm resize-none"
                    />
            </div>
            <div>
                <Card className="bg-muted h-80">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="font-code text-sm text-muted-foreground whitespace-pre-wrap">{output}</pre>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
