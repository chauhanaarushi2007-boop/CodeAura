'use client';
import { useEffect, useState } from 'react';
import { languages } from '@/lib/placeholder-data';
import { LanguageIcon } from '@/components/icons/language-icons';
import { cn } from '@/lib/utils';

type AnimatedIcon = {
  id: string;
  component: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
};

export function AnimatedIconBackground() {
  const [icons, setIcons] = useState<AnimatedIcon[]>([]);

  useEffect(() => {
    const generatedIcons = Array.from({ length: 30 }).map((_, i) => {
      const lang = languages[i % languages.length];
      const size = Math.random() * 60 + 20; // 20px to 80px
      const duration = Math.random() * 20 + 15; // 15s to 35s
      const delay = Math.random() * -20; // Start at different times
      const left = Math.random() * 100;

      return {
        id: `${lang.id}-${i}`,
        component: (props: {className?: string}) => <LanguageIcon language={lang.id} {...props} />,
        style: {
          left: `${left}vw`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        },
      };
    });
    setIcons(generatedIcons);
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        <div className="relative h-full w-full">
          {icons.map(({ id, component: Icon, style }) => (
            <div
              key={id}
              className={cn(
                'absolute bottom-0 animate-drift text-primary/20'
              )}
              style={style}
            >
              <Icon className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        .animate-drift {
          animation-name: drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}
