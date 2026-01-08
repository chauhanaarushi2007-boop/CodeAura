
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { addFeedback } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useFeedback } from '@/services/feedback';
import type { Feedback } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

function FeedbackForm() {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  const formAction = async (formData: FormData) => {
    formData.set('rating', rating.toString());
    startTransition(async () => {
      const result = await addFeedback(formData);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else {
        toast({
          title: 'Success!',
          description: 'Your feedback has been submitted.',
        });
        // Note: Resetting server-action forms requires more complex state management
      }
    });
  };

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-primary/80 font-code">
          /your-name
        </label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Anonymous Hacker"
          className="bg-background/20 border-primary/20 backdrop-blur-sm focus:ring-accent focus:border-accent transition-all"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-primary/80 font-code">
          /your-feedback
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us what you think..."
          rows={5}
          className="bg-background/20 border-primary/20 backdrop-blur-sm focus:ring-accent focus:border-accent transition-all"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-primary/80 font-code">
          /your-rating
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'w-8 h-8 cursor-pointer transition-all duration-200',
                (hoverRating >= star || rating >= star)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-primary/30',
                'hover:text-yellow-300 hover:fill-yellow-300 hover:scale-125'
              )}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <Button
          type="submit"
          disabled={isPending || rating === 0}
          className="w-full font-code text-lg py-6 bg-primary/80 hover:bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)] transition-all disabled:opacity-50"
        >
          {isPending ? 'Submitting...' : 'Submit >>'}
        </Button>
      </motion.div>
    </motion.form>
  );
}

function FeedbackItem({ feedback }: { feedback: Feedback }) {
    const { name, message, rating, createdAt, sentiment } = feedback;
  
    const timeAgo = useMemo(() => {
      if (createdAt?.seconds) {
        return formatDistanceToNow(new Date(createdAt.seconds * 1000), { addSuffix: true });
      }
      return 'just now';
    }, [createdAt]);
  
    const sentimentColor = {
      Positive: 'text-green-400',
      Negative: 'text-red-400',
      Neutral: 'text-blue-400',
    };
  
    return (
      <div className="bg-card/5 border border-primary/10 p-6 rounded-lg backdrop-blur-sm">
        <div className="flex items-start justify-between mb-2">
            <div>
                <p className="font-code text-primary font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-5 h-5", i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-primary/30')} />
                ))}
            </div>
        </div>
        <p className="text-foreground/80 my-4">{message}</p>
        {sentiment && (
            <p className={cn("text-sm font-code", sentimentColor[sentiment])}>
                // Sentiment: {sentiment}
            </p>
        )}
      </div>
    );
  }

function FeedbackList() {
    const { data: feedback, loading } = useFeedback();

    if (loading) {
        return <div className="text-center text-primary/80 font-code">Loading feedback stream...</div>
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {feedback.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <FeedbackItem feedback={item} />
                </motion.div>
            ))}
        </div>
    )
}

export default function FeedbackPage() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-20 bg-midnight">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Intro "Vault Door" Animation */}
      <AnimatePresence onExitComplete={() => setIntroFinished(true)}>
        {!introFinished && (
          <motion.div
            key="vault"
            className="absolute inset-0 z-50 flex bg-slate-950"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
              className="w-1/2 h-full bg-slate-950 border-r-2 border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
            />
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
              className="w-1/2 h-full bg-slate-950 border-l-2 border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {introFinished && (
        <>
          <div className="container relative z-10 py-12 md:py-24 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl animated-gradient-text bg-gradient-to-r from-primary via-accent to-primary"
            >
              System Feedback
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-xl mx-auto mt-4 text-muted-foreground md:text-xl font-code"
            >
              Your input is critical. Report bugs, suggest features, or leave a rating.
            </motion.p>
          </div>

          <main className="relative z-10 px-4 pb-24">
            <FeedbackForm />
            <div className="my-24 border-t border-primary/20 w-1/2 mx-auto"></div>
            <FeedbackList />
          </main>
        </>
      )}
    </div>
  );
}
