import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { books, websites } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Network, Code, BookOpen, School, ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WebsiteReference } from "@/lib/types";


const iconMap: Record<WebsiteReference['icon'], React.ComponentType<{className?: string}>> = {
    BrainCircuit: BrainCircuit,
    Network: Network,
    Code: Code,
    BookOpen: BookOpen,
    School: School,
};


export default function ReferencesPage() {

  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Curated Book Recommendations
        </h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Deepen your knowledge with our hand-picked selection of the best programming books.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => {
          const image = getImage(book.imageId);
          return (
            <Link href={book.url} target="_blank" rel="noopener noreferrer" key={book.id} className="group">
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                 <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground p-2 rounded-full transform transition-transform group-hover:scale-110">
                    <ArrowRight className="w-5 h-5" />
                  </div>
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{book.title}</CardTitle>
                <CardDescription>by {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm flex-grow">{book.description}</p>
              </CardContent>
            </Card>
            </Link>
          );
        })}
      </div>

      <div className="text-center my-12 pt-8">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Explore Computer Science
        </h2>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Dive deeper into programming and computer science with these excellent online resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((site) => {
              const Icon = iconMap[site.icon] || Globe;
              return (
                  <Link href={site.url} target="_blank" rel="noopener noreferrer" key={site.id} className="group">
                      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                           <CardHeader className="flex-row items-start gap-4">
                              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                 <Icon className="w-6 h-6" />
                              </div>
                              <div>
                                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{site.name}</CardTitle>
                                  <CardDescription>{new URL(site.url).hostname}</CardDescription>
                              </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                              <p className="text-muted-foreground">{site.description}</p>
                          </CardContent>
                          <div className="p-6 pt-0">
                              <div className="text-sm font-medium text-primary flex items-center gap-1">
                                  Visit Site
                                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                              </div>
                          </div>
                      </Card>
                  </Link>
              )
          })}
      </div>
    </div>
  );
}
