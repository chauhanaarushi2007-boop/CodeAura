
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookCategories } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ReferencesPage() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  };

  const levelData = [
    { level: 'Beginner', topics: 'Fundamentals', books: ['"Head First …"', '"Automate the Boring Stuff"'] },
    { level: 'Intermediate', topics: 'Best practices & patterns', books: ['"Effective …"', '"Fluent …"', '"Clean Code"'] },
    { level: 'Advanced', topics: 'Deep internals & theory', books: ['"Pattern Recognition and ML"', '"Deep Learning"', '"AI: A Modern Approach"'] },
    { level: 'Security Focus', topics: 'Ethical hacking & cybersecurity', books: ['"Web App Hacker’s Handbook"'] },
  ];

  const groupedCategories = [
    { title: 'Programming Languages', ids: ['python', 'javascript', 'java', 'c', 'cpp', 'csharp', 'go', 'rust', 'ruby', 'swift'] },
    { title: 'Cybersecurity', ids: ['ethical-hacking', 'cybersecurity'] },
    { title: 'Artificial Intelligence', ids: ['ai', 'ml'] },
    { title: 'Data & Software Practices', ids: ['data-science', 'software-engineering'] },
  ];

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
              Curated Book Recommendations
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
              A hand-picked selection of essential books for programmers, recommended by industry experts.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container pb-24">
        {groupedCategories.map((group, groupIndex) => (
          <div key={group.title} className="mb-20">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-8 border-b-2 border-primary pb-2">{group.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {bookCategories.filter(cat => group.ids.includes(cat.id)).map((category, index) => {
                const image = getImage(category.id);
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index * 0.1) + (groupIndex * 0.2) }}
                  >
                    <Card className="group relative overflow-hidden h-full flex flex-col perspective-card bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                       {image && (
                          <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                              <Image
                                  src={image.imageUrl}
                                  alt={`${category.title} background`}
                                  fill
                                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                                  data-ai-hint={image.imageHint}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                          </div>
                       )}
                       <div className="relative z-10 flex flex-col h-full">
                          <CardHeader>
                            <CardTitle className="font-headline text-3xl text-primary">{category.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <ul className="space-y-4">
                              {category.books.map((book) => (
                                <li key={book.id}>
                                  <Link href={book.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md hover:bg-muted/50 transition-colors">
                                    <h4 className="font-semibold text-lg">{book.title}</h4>
                                    <p className="text-sm text-muted-foreground italic mb-1">by {book.author}</p>
                                    <p className="text-sm text-foreground/80">{book.description}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                       </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="mt-24">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">Quick Reference by Level</h2>
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
             >
                <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/50">
                                <TableHead className="w-[150px] font-headline text-lg">Level</TableHead>
                                <TableHead className="font-headline text-lg">Topics Covered</TableHead>
                                <TableHead className="font-headline text-lg">Recommended Books</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {levelData.map(row => (
                                <TableRow key={row.level} className="border-border/20">
                                    <TableCell className="font-semibold text-primary">{row.level}</TableCell>
                                    <TableCell>{row.topics}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {row.books.map(book => <Badge key={book} variant="secondary">{book}</Badge>)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                <p className="text-center text-sm text-muted-foreground mt-4">✔ Supplement books with tutorials and documentation.</p>
            </motion.div>
        </div>
      </main>
    </div>
  );
}
