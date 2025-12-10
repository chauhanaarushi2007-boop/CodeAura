
import { BrainCircuit, Cpu, Bot, BookOpen, GraduationCap, Link as LinkIcon, Languages, LineChart, Code, ArrowRight, Book, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { books, websites } from "@/lib/placeholder-data";
import type { WebsiteReference } from "@/lib/types";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const platforms = [
  {
    name: "DataCamp",
    description: "Build your data science and AI skills with hands-on learning, from Python to machine learning.",
    href: "https://www.datacamp.com/",
    icon: LineChart,
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
  },
  {
    name: "Kaggle",
    description: "Learn through competitions and access powerful tools and datasets to practice your ML skills.",
    href: "https://www.kaggle.com/learn",
    icon: Cpu,
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
  },
  {
    name: "Codecademy",
    description: "Follow a structured path to learn machine learning, from the basics to advanced concepts.",
    href: "https://www.codecademy.com/learn/machine-learning",
    icon: Code,
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
  },
];

const aiBooks = books.filter(book => book.language === 'python' && (book.id.includes('ai') || book.id.includes('python-crash-course')));

export default function AiMlPage() {

   const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

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
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Explore Top Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <Link href={platform.href} key={platform.name} className="group" target="_blank" rel="noopener noreferrer">
                <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                     <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-lg w-fit", platform.bgColor)}>
                          <Icon className={cn("w-8 h-8", platform.textColor)} />
                        </div>
                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{platform.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{platform.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                      <div className="text-sm font-medium text-primary flex items-center gap-1">
                          Start Learning
                          <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="bg-card/50 py-16 rounded-lg">
         <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">Recommended Reading</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                Deepen your theoretical knowledge with these essential books recommended by experts in the field.
            </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aiBooks.map((book) => {
              const image = getImage(book.imageId);
              return (
                <Card key={book.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-full h-64 bg-muted relative">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={book.title}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{book.title}</CardTitle>
                    <CardDescription>by {book.author}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
        </div>
      </section>
    </div>
  );
}
