import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  message: string;
  isLoading?: boolean;
}

const isCodeBlock = (text: string) => {
    return text.trim().startsWith('```');
}

export function ChatMessage({ role, message, isLoading }: ChatMessageProps) {
    const parts = message.split(/(```[\s\S]*?```)/g).filter(Boolean);

    return (
        <div className={cn("flex items-start space-x-3", role === 'user' ? "justify-end" : "")}>
            {role === 'assistant' && (
                <Avatar className="h-8 w-8">
                    <div className="bg-primary rounded-full h-full w-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                </Avatar>
            )}
            <div className={cn("rounded-lg px-4 py-2 max-w-sm", role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                 {isLoading ? (
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                    </div>
                ) : (
                    <div className="text-sm whitespace-pre-wrap">
                        {parts.map((part, index) => {
                             if (isCodeBlock(part)) {
                                const code = part.replace(/```(\w*\n)?/g, '').trim();
                                const langMatch = part.match(/```(\w+)/);
                                const lang = langMatch ? langMatch[1] : '';
                                return <CodeBlock key={index} code={code} language={lang} className="my-2" />;
                            }
                            return part;
                        })}
                    </div>
                )}
            </div>
            {role === 'user' && (
                 <Avatar className="h-8 w-8">
                     <div className="bg-secondary rounded-full h-full w-full flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary-foreground" />
                    </div>
                </Avatar>
            )}
        </div>
    );
}
