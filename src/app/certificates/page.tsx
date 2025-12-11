
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { certificatePlatforms } from '@/lib/certificate-data';
import type { CertificatePlatform } from '@/lib/types';
import { ArrowRight, Award, Search } from 'lucide-react';
import Link from 'next/link';

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
          Enhance your portfolio and learn new skills for the future. Explore these platforms offering free certificates.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a skill (e.g., Python, AI, Marketing)..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlatforms.map((platform) => (
          <Link href={platform.url} target="_blank" rel="noopener noreferrer" key={platform.id} className="group">
            <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
              <CardHeader className="flex-row items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-card flex items-center justify-center rounded-lg p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={platform.logo} alt={`${platform.name} logo`} className="object-contain w-full h-full" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{platform.name}</CardTitle>
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

       {filteredPlatforms.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No platforms found for &quot;{searchTerm}&quot;.</p>
          <p className="text-sm text-muted-foreground mt-2">Try searching for a broader term.</p>
        </div>
      )}
    </div>
  );
}
