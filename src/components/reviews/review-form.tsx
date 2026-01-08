
'use client';

import { useState, useTransition } from 'react';
import type { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { addReview } from '@/services/reviews';
import { StarRatingInput } from '@/components/reviews/star-rating';

interface ReviewFormProps {
    user: User;
}

export default function ReviewForm({ user }: ReviewFormProps) {
    const db = useFirestore();
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSubmit = () => {
        if (rating === 0) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a star rating.' });
            return;
        }
        if (text.trim().length < 15) {
            toast({ variant: 'destructive', title: 'Error', description: 'Review must be at least 15 characters long.' });
            return;
        }

        startTransition(async () => {
            const result = await addReview(db, user.uid, {
                rating,
                text,
                userName: user.displayName || 'Anonymous',
                userPhotoURL: user.photoURL,
            });

            if (result.error) {
                toast({ variant: 'destructive', title: 'Error', description: result.error });
            } else {
                toast({ title: 'Review Submitted!', description: 'Thank you. Your review is pending approval.' });
                setRating(0);
                setText('');
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Let us and the community know what you think.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2 text-center">
                    <label className="font-medium text-sm">Your Rating</label>
                    <StarRatingInput rating={rating} setRating={setRating} disabled={isPending} size="large" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="review-text" className="font-medium text-sm">Your Review</label>
                    <Textarea
                        id="review-text"
                        placeholder="What did you like or dislike? What did you use this for?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={6}
                        disabled={isPending}
                    />
                </div>
                <Button 
                    onClick={handleSubmit} 
                    disabled={isPending || rating === 0 || text.trim().length < 15} 
                    className="w-full"
                >
                    {isPending ? 'Submitting...' : 'Submit Review'}
                </Button>
            </CardContent>
        </Card>
    );
}
