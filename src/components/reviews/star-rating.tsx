
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
  disabled: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function StarRatingInput({ rating, setRating, disabled, size = 'medium' }: StarRatingInputProps) {
  const [hover, setHover] = useState(0);
  const starSize = size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4';

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
                starSize,
                'cursor-pointer transition-colors',
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
}

interface StarRatingDisplayProps {
    rating: number;
    size?: 'small' | 'medium';
}

export function StarRatingDisplay({ rating, size = 'small' }: StarRatingDisplayProps) {
    const starSize = size === 'medium' ? 'w-5 h-5' : 'w-4 h-4';
    return (
        <div className="flex items-center space-x-0.5">
            {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    className={cn(
                        starSize,
                        i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
                    )}
                />
            ))}
        </div>
    );
}
