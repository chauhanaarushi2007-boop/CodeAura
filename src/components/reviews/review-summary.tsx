
'use client';

import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import type { Review } from './review-list';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

function ReviewSummarySkeleton() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-end gap-4 mb-6">
                    <div className="flex items-baseline">
                        <Skeleton className="h-10 w-16" />
                        <Skeleton className="h-6 w-8 ml-1" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-2 w-full" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default function ReviewSummary() {
    const db = useFirestore();
    const reviewsQuery = useMemo(() => {
        return query(
            collection(db, 'reviews'),
            where('status', '==', 'approved')
        );
    }, [db]);
    const { data: snapshot, loading } = useCollection<Review>(reviewsQuery);

    const { averageRating, totalReviews, ratingDistribution } = useMemo(() => {
        if (!snapshot || snapshot.empty) {
            return { averageRating: 0, totalReviews: 0, ratingDistribution: [] };
        }

        const reviews = snapshot.docs.map(doc => doc.data());
        const total = reviews.reduce((acc, item) => acc + item.rating, 0);
        const avg = total / reviews.length;

        const distribution = [5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(item => item.rating === star).length;
            const percentage = (count / reviews.length) * 100;
            return { star, count, percentage };
        });

        return {
            averageRating: avg,
            totalReviews: reviews.length,
            ratingDistribution: distribution
        };
    }, [snapshot]);

    if (loading) {
        return <ReviewSummarySkeleton />;
    }
    
    if (totalReviews === 0) {
        return null; // Don't show summary if there are no reviews
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-baseline">
                        <span className="font-bold text-4xl">{averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-xl">/ 5</span>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        Based on {totalReviews} reviews
                    </div>
                </div>
                <div className="space-y-1.5">
                    {ratingDistribution.map(item => (
                        <div key={item.star} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-12 flex items-center">{item.star} <Star className="w-3 h-3 fill-current text-yellow-400 ml-1" /></span>
                            <Progress value={item.percentage} className="flex-1 h-2" aria-label={`${item.percentage.toFixed(0)}% of reviews are ${item.star} stars`} />
                            <span className="font-mono w-8 text-right">{item.count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
