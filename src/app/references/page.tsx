
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookCategories, websites } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Brain, Code, Globe, School } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  Brain: Brain,
  Globe: Globe,
  Code: Code,
  BookOpen: BookOpen,
  School: School
};

export default function ReferencesPage() {
  const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image;
  };

  return (
    <div className="bg-background text-foreground animate-fade-in">
      <header className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="w-24 h-24 mx-auto mb-6 text-primary animated-gradient-text bg-gradient-to-r from-primary via-accent to-primary" />
            <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
              Curated Learning Resources
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
              A hand-picked selection of essential books and websites for programmers, recommended by industry experts.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container pb-24 space-y-20">
        <div>
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-12 text-center animate-fade-in-up">Recommended Books</h2>
            <div className="space-y-20">
            {bookCategories.map((category, groupIndex) => {
              const image = getImage(category.id);
              return (
              <div key={category.id} className="relative group overflow-hidden rounded-2xl p-8 bg-card/50 border border-border/20 backdrop-blur-sm shadow-2xl shadow-primary/5">
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                    {image && (
                    <Image
                        src={image.imageUrl}
                        alt={`${category.title} background`}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105 animate-ken-burns"
                        data-ai-hint={image.imageHint}
                    />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent"></div>
                </div>

                <div className="relative z-10 animate-fade-in-up">
                  <h3 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-8 border-b-2 border-primary pb-2 text-shadow-lg shadow-black/50">{category.title}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {category.books.map((book, index) => {
                      return (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: (index * 0.1) + (groupIndex * 0.1) }}
                        >
                          <Link href={book.url} target="_blank" rel="noopener noreferrer" className="block h-full group/book">
                              <Card className="relative overflow-hidden h-full flex flex-col perspective-card bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                <div className="relative z-10 flex flex-col h-full p-6">
                                    <h4 className="font-semibold text-lg font-headline">{book.title}</h4>
                                    <p className="text-sm text-muted-foreground italic mb-2">by {book.author}</p>
                                    <p className="text-sm text-foreground/80 flex-grow">{book.description}</p>
                                </div>
                              </Card>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

        <div className="animate-fade-in-up">
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-12 text-center">Helpful Websites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {websites.map((site, index) => {
                    const Icon = iconMap[site.icon as keyof typeof iconMap];
                    return (
                        <motion.div
                            key={site.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={site.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
                                <Card className="h-full flex flex-col perspective-card bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-all duration-300 p-6">
                                    <CardHeader className="flex-row items-center gap-4 p-0 mb-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            {Icon && <Icon className="w-8 h-8 text-primary" />}
                                        </div>
                                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{site.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 flex-grow">
                                        <p className="text-muted-foreground">{site.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </div>
      </main>
    </div>
  );
}
