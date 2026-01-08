
'use client';

import { Star } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ReviewForm from '@/components/reviews/review-form';
import ReviewSummary from '@/components/reviews/review-summary';
import ReviewList from '@/components/reviews/review-list';

export default function ReviewsPage() {
  const { user, loading } = useUser();

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

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h2 className="font-headline text-2xl font-bold mb-4">Leave a Review</h2>
          {loading ? (
             <Card>
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
                 <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">Checking authentication status...</p>
                 </CardContent>
             </Card>
          ) : user ? (
            <ReviewForm user={user} />
          ) : (
             <Card className="flex flex-col items-center justify-center p-8 text-center h-full">
                <CardHeader>
                    <CardTitle>Log In to Leave a Review</CardTitle>
                    <CardDescription>You must be signed in to share your feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/login">Log In / Sign Up</Link>
                    </Button>
                </CardContent>
             </Card>
          )}
        </div>
        <div className="lg:col-span-2">
          <h2 className="font-headline text-2xl font-bold mb-4">Community Reviews</h2>
          <div className="space-y-8">
            <ReviewSummary />
            <ReviewList />
          </div>
        </div>
      </div>
    </div>
  );
}
