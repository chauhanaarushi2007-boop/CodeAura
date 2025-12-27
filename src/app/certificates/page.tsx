
'use client';

import { useState, useTransition, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { certificatePlatforms } from '@/lib/certificate-data';
import type { CertificatePlatform } from '@/lib/types';
import { ArrowRight, Award, Search, BookOpen, Link as LinkIcon, Bot } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { findFreeCourses } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';

type FoundCourse = {
  title: string;
  url: string;
  platform: string;
};

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const [foundCourses, setFoundCourses] = useState<FoundCourse[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim().length < 3) {
      setFoundCourses([]);
      setSearchPerformed(false);
      return;
    }
    setSearchPerformed(true);
    startTransition(async () => {
      const result = await findFreeCourses(searchTerm);
      if (result.courses) {
        setFoundCourses(result.courses);
      }
    });
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim().length === 0) {
        setFoundCourses([]);
        setSearchPerformed(false);
    }
  }

  const filteredPlatforms = certificatePlatforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Award className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Free Certificate Courses
        </h1>
        <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Use Aurix to find free courses from across the web, or browse our curated list of platforms.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for a skill (e.g., Python, AI, Marketing)..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>
      
      {searchPerformed && (
        <div className="mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <Bot className="w-8 h-8 text-primary" />
              AI Found Courses for &quot;{searchTerm}&quot;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isPending ? (
                    Array.from({length: 3}).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                        </Card>
                    ))
                ) : foundCourses.length > 0 ? (
                    foundCourses.map((course, index) => (
                        <Link href={course.url} target="_blank" rel="noopener noreferrer" key={index} className="group">
                           <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{course.title}</CardTitle>
                                    <CardDescription>{course.platform}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow"></CardContent>
                                <div className="p-6 pt-0">
                                    <div className="text-sm font-medium text-primary flex items-center gap-1">
                                        Go to course
                                        <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-lg text-muted-foreground">Aurix couldn&apos;t find any free courses for &quot;{searchTerm}&quot;.</p>
                        <p className="text-sm text-muted-foreground mt-2">Try a different search term.</p>
                    </div>
                )}
            </div>
        </div>
      )}


      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          Curated Certificate Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlatforms.map((platform) => (
            <Link href={platform.url} target="_blank" rel="noopener noreferrer" key={platform.id} className="group">
              <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{platform.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-4">{platform.description}</p>
                   <div className="mt-4 flex flex-wrap gap-2">
                      {platform.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{tag}</span>
                      ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <div className="text-sm font-medium text-primary flex items-center gap-1">
                    Visit Platform
                    <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

         {filteredPlatforms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No platforms found for &quot;{searchTerm}&quot; in our curated list.</p>
            <p className="text-sm text-muted-foreground mt-2">Try the AI search above or broaden your search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
