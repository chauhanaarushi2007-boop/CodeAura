
'use client';

import { collection, query, where, orderBy, type Firestore } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase/provider';
import { useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRatingDisplay } from '@/components/reviews/star-rating';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  rating: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

function ReviewCard({ review }: { review: Review }) {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
    const reviewDate = new Date(review.createdAt.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card className="bg-card/50">
            <CardHeader className="flex-row items-start gap-4">
                <Avatar>
                    <AvatarImage src={review.userPhotoURL} alt={review.userName} />
                    <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="text-base font-semibold">{review.userName}</CardTitle>
                    <StarRatingDisplay rating={review.rating} />
                </div>
                 <time className="text-xs text-muted-foreground">{reviewDate}</time>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{review.text}</p>
            </CardContent>
        </Card>
    )
}

function ReviewListSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50">
                    <CardHeader className="flex-row items-start gap-4">
                         <Skeleton className="h-10 w-10 rounded-full" />
                         <div className="flex-1 space-y-2">
                             <Skeleton className="h-4 w-32" />
                             <Skeleton className="h-4 w-24" />
                         </div>
                         <Skeleton className="h-4 w-20" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


export default function ReviewList() {
    const db = useFirestore() as Firestore;
    const reviewsQuery = useMemo(() => {
        return query(
            collection(db, 'reviews'), 
            where('status', '==', 'approved'),
            orderBy('createdAt', 'desc')
        );
    }, [db]);
    
    const { data: snapshot, loading, error } = useCollection<Review>(reviewsQuery);
    
    const reviews = useMemo(() => {
        if (!snapshot) return [];
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
    }, [snapshot]);

    if (loading) {
        return <ReviewListSkeleton />;
    }

    if (error) {
        return <p className="text-destructive text-center">Error loading reviews.</p>;
    }
    
    if (reviews.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to leave one!</p>;
    }

    return (
        <div className="space-y-4">
             <AnimatePresence>
                {reviews.map((review) => (
                     <motion.div
                        key={review.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                     >
                        <ReviewCard review={review} />
                     </motion.div>
                ))}
             </AnimatePresence>
        </div>
    );
}
