
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { certificatePlatforms } from '@/lib/certificate-data';
import { ArrowRight, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CertificatesPage() {

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Award className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Free Certificate Courses
        </h1>
        <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Browse our curated list of platforms offering free certificates.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 flex items-center gap-3 justify-center">
          <BookOpen className="w-8 h-8 text-primary" />
          Curated Certificate Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatePlatforms.map((platform) => (
            <Link href={platform.url} target="_blank" rel="noopener noreferrer" key={platform.id} className="group">
              <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{platform.name}</CardTitle>
                      <div className="h-10 w-24 flex items-center justify-end">
                        <span className="font-headline text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/80 transition-all duration-300 group-hover:saturate-150">
                            {platform.name.split(' ')[0]}
                        </span>
                      </div>
                  </div>
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
      </div>
    </div>
  );
}
