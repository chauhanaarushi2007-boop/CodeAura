
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div className="container py-12">
      <header className="text-center mb-12">
        <Star className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Product Reviews
        </h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          See what others are saying and share your own experience.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
         <div>
            <h2 className="font-headline text-2xl font-bold mb-4">Leave a Review</h2>
            {/* Review submission form will go here */}
             <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
                <p>Authentication and review form coming soon!</p>
            </div>
         </div>
         <div>
             <h2 className="font-headline text-2xl font-bold mb-4">Community Reviews</h2>
             {/* Public review display will go here */}
             <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
                <p>Live review display coming soon!</p>
            </div>
         </div>
      </div>

    </div>
  );
}
