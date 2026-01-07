'use client';

import { useState, useTransition, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquare, TrendingUp, ThumbsDown, ThumbsUp, Meh } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { addFeedback, useFeedback } from '@/services/feedback';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirestore } from '@/firebase';

const StarRating = ({ rating, setRating, disabled }: { rating: number; setRating: (r: number) => void; disabled: boolean }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex justify-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <motion.div
            key={index}
            whileHover={{ scale: disabled ? 1 : 1.2 }}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Star
              className={cn(
                'w-8 h-8 cursor-pointer transition-colors',
                ratingValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50',
                disabled ? 'cursor-not-allowed' : ''
              )}
              onClick={() => !disabled && setRating(ratingValue)}
              onMouseEnter={() => !disabled && setHover(ratingValue)}
              onMouseLeave={() => !disabled && setHover(0)}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

const SentimentIcon = ({ sentiment }: { sentiment: string | undefined }) => {
    switch (sentiment) {
        case 'Positive':
            return <ThumbsUp className="w-5 h-5 text-green-500" />;
        case 'Negative':
            return <ThumbsDown className="w-5 h-5 text-red-500" />;
        case 'Neutral':
            return <Meh className="w-5 h-5 text-yellow-500" />;
        default:
            return null;
    }
};

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { feedback, loading } = useFeedback();
  const db = useFirestore();

  const handleSubmit = () => {
    if (!db) {
        toast({ variant: 'destructive', title: 'Error', description: 'Database not available. Please try again later.' });
        return;
    }
    if (rating === 0) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a star rating.' });
      return;
    }
    if (message.trim().length < 10) {
      toast({ variant: 'destructive', title: 'Error', description: 'Feedback must be at least 10 characters long.' });
      return;
    }

    startTransition(async () => {
      try {
        await addFeedback(db, { rating, message });
        toast({ title: 'Success!', description: 'Thank you for your feedback.' });
        setRating(0);
        setMessage('');
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message || 'Could not submit feedback.' });
      }
    });
  };

  const { averageRating, totalFeedback, ratingDistribution } = useMemo(() => {
    if (!feedback || feedback.length === 0) {
        return { averageRating: 0, totalFeedback: 0, ratingDistribution: [] };
    }

    const total = feedback.reduce((acc, item) => acc + item.rating, 0);
    const avg = total / feedback.length;

    const distribution = [5, 4, 3, 2, 1].map(star => {
        const count = feedback.filter(item => item.rating === star).length;
        const percentage = (count / feedback.length) * 100;
        return { star, count, percentage };
    });

    return { 
        averageRating: avg,
        totalFeedback: feedback.length,
        ratingDistribution: distribution
    };
  }, [feedback]);


  return (
    <div className="container py-12">
      <header className="text-center mb-12">
        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Website Feedback
        </h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          We value your opinion! Let us know how we can improve.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 shadow-lg">
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
              <CardDescription>Tell us what you think about our website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="font-medium text-sm">Your Rating</label>
                <StarRating rating={rating} setRating={setRating} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label htmlFor="feedback-message" className="font-medium text-sm">Your Feedback</label>
                <Textarea
                  id="feedback-message"
                  placeholder="What did you like or dislike? (min. 10 characters)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  disabled={isPending}
                />
              </div>
              <Button onClick={handleSubmit} disabled={isPending || message.trim().length < 10 || rating === 0} className="w-full">
                {isPending ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 shadow-lg h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Live Feedback
              </CardTitle>
              <CardDescription>See what other users are saying.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                 <div className="flex items-end gap-4 mb-6">
                    <div className="flex items-baseline">
                        <span className="font-bold text-4xl">{averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-xl">/5</span>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        Based on {totalFeedback} reviews
                    </div>
                 </div>
                 <div className="space-y-1 mb-8">
                     {ratingDistribution.map(item => (
                         <div key={item.star} className="flex items-center gap-2 text-sm">
                             <span className="text-muted-foreground w-12">{item.star} star</span>
                             <Progress value={item.percentage} className="flex-1 h-2" />
                             <span className="text-muted-foreground font-mono w-8 text-right">{item.count}</span>
                         </div>
                     ))}
                 </div>
                  <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                    <AnimatePresence>
                      {feedback.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="p-4 border rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn('w-4 h-4', i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30')} />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <SentimentIcon sentiment={item.sentiment} />
                                <span className={cn(
                                    item.sentiment === 'Positive' && 'text-green-500',
                                    item.sentiment === 'Negative' && 'text-red-500',
                                    item.sentiment === 'Neutral' && 'text-yellow-500',
                                )}>{item.sentiment}</span>
                            </div>
                          </div>
                          <p className="text-sm text-foreground/80">{item.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(item.createdAt.seconds * 1000).toLocaleString()}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
