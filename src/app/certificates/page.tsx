
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Award, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { findFreeCourses } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

type Course = {
    platform: string;
    courseName: string;
    url: string;
    description: string;
};

export default function CertificatesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [isSearching, startSearchTransition] = useTransition();
    const [searchError, setSearchError] = useState<string | null>(null);

    const handleSearch = () => {
        if (!searchTerm) return;
        startSearchTransition(async () => {
            setSearchError(null);
            setSearchResults([]);
            const result = await findFreeCourses(searchTerm);
            if (result.error) {
                setSearchError(result.error);
            } else {
                setSearchResults(result.courses);
            }
        });
    };

    return (
        <div className="container py-12">
            <header className="relative py-20 text-center overflow-hidden rounded-xl mb-12 bg-card/50 border">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
                <div className="container relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <Award className="w-24 h-24 mx-auto mb-6 text-primary" />
                        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                            Free Certificate Courses
                        </h1>
                        <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
                            Find free courses with certificates from top platforms on any topic.
                        </p>
                    </motion.div>
                </div>
            </header>

            <div className="mt-16 max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 flex items-center gap-3 justify-center">
                    <Search className="w-8 h-8 text-primary" />
                    Find Courses by Topic
                </h2>
                <div className="flex items-center gap-2 mb-8">
                    <Input
                        type="text"
                        placeholder="e.g., 'Python for Data Science', 'Introduction to AI'"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="h-12 text-lg"
                    />
                    <Button onClick={handleSearch} disabled={isSearching} size="lg" className="h-12">
                        {isSearching ? 'Searching...' : 'Search'}
                    </Button>
                </div>

                <div className="space-y-4">
                    {isSearching && (
                        Array.from({ length: 3 }).map((_, i) => (
                           <Card key={i} className="bg-card/80 backdrop-blur-sm border-border/50 p-4">
                               <div className="flex items-center gap-4">
                                  <Skeleton className="h-12 w-12 rounded-lg" />
                                  <div className="space-y-2 flex-1">
                                      <Skeleton className="h-4 w-3/4" />
                                      <Skeleton className="h-4 w-1/2" />
                                  </div>
                               </div>
                           </Card>
                        ))
                    )}
                    {searchError && <p className="text-destructive text-center">{searchError}</p>}
                    {searchResults.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={course.url} target="_blank" rel="noopener noreferrer" className="group block">
                                <Card className="h-full flex flex-col perspective-card bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{course.courseName}</CardTitle>
                                        <CardDescription>{course.platform}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground line-clamp-3">{course.description}</p>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <div className="text-sm font-medium text-primary flex items-center gap-1">
                                            Go to Course
                                            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
