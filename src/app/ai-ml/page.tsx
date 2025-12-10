import { BrainCircuit, Cpu, Bot, BookOpen, GraduationCap, Link as LinkIcon, Languages } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AiMlPage() {
  const topics = [
    {
      title: "Core Machine Learning",
      description: "Understand the fundamentals, from linear regression to neural networks.",
      icon: Cpu,
      href: "/tutorials/python",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Deep Learning",
      description: "Explore neural networks, computer vision, and how machines learn from data.",
      icon: BrainCircuit,
      href: "/references",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Natural Language Processing",
      description: "Learn how AI understands and generates human language, from chatbots to translation.",
      icon: Languages,
      href: "/references",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="container py-12">
      <header className="mb-12 text-center">
        <Bot className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Welcome to the AI & ML Universe
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          From the basics of machine learning to the frontiers of generative AI, your journey from beginner to brilliant starts here.
        </p>
      </header>
      
      <section className="mb-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Your Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link href={topic.href} key={topic.title} className="group">
                <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="items-center text-center">
                    <div className={cn("p-4 rounded-full w-fit mb-4", topic.bgColor)}>
                       <Icon className={cn("w-10 h-10", topic.color)} />
                    </div>
                    <CardTitle className="font-headline text-2xl">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <p className="text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="text-center bg-card/50 py-16 rounded-lg">
         <div className="max-w-2xl mx-auto">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">Ready to Dive In?</h2>
            <p className="text-muted-foreground mb-8">
                Explore our curated tutorials, practical guides, and book recommendations to accelerate your learning.
            </p>
             <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/tutorials">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Start a Tutorial
                    </Link>
                </Button>
                 <Button asChild size="lg" variant="outline">
                    <Link href="/references">
                        <LinkIcon className="mr-2 h-5 w-5" />
                        Explore References
                    </Link>
                </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
