import { BrainCircuit, Lightbulb, ListChecks, TestTube2, ChevronsRight, Target, CaseSensitive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PromptEngineeringPage() {
  const principles = [
    { title: "Be Specific and Clear", icon: Target, description: "Vague prompts lead to vague answers. Provide as much detail as possible. Instead of 'write about cars', try 'write a blog post about the history of the Ford Mustang, focusing on its impact on American culture.'" },
    { title: "Provide Context", icon: CaseSensitive, description: "Give the AI context for its task. Tell it who the audience is, what the purpose of the text is, and what information is relevant." },
    { title: "Define the Persona", icon: BrainCircuit, description: "Instruct the AI to adopt a specific persona. For example: 'You are a helpful senior software engineer explaining a complex topic to a junior developer.'" },
    { title: "Specify the Format", icon: ListChecks, description: "Tell the AI exactly how you want the output formatted. Should it be a list, a JSON object, a poem, a blog post? Be explicit." },
  ];

  const techniques = [
    { title: "Zero-Shot Prompting", badge: "Basic", description: "The simplest form. You ask the model to do something without giving it any examples. E.g., 'Translate this sentence to French: ...'" },
    { title: "Few-Shot Prompting", badge: "Intermediate", description: "Provide a few examples of the task before asking the model to perform it. This helps the model understand the pattern you're looking for." },
    { title: "Chain-of-Thought (CoT) Prompting", badge: "Advanced", description: "Encourage the model to 'think step by step'. By asking it to explain its reasoning, you can often guide it to a more accurate conclusion, especially for complex problems." },
    { title: "Generated Knowledge Prompting", badge: "Advanced", description: "First, ask the model to generate facts or knowledge about a topic. Then, use that generated knowledge in a second prompt to answer your final question." },
  ];

  return (
    <div className="container py-12">
      <header className="mb-12 text-center">
        <BrainCircuit className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Mastering Prompt Engineering
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Learn how to communicate effectively with AI models to get the results you want.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="flex-row items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Advanced Techniques</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {techniques.map((item) => (
            <Card key={item.title} className="overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                         <Badge variant={item.badge === 'Advanced' ? 'destructive' : (item.badge === 'Intermediate' ? 'secondary' : 'default')}>{item.badge}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}