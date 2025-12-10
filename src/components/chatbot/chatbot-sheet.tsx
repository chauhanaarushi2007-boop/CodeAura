"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from '@/components/chatbot/chat-input';
import { ChatMessage } from '@/components/chatbot/chat-message';
import { askAurix } from '@/app/actions';
import type { ChatMessage as ChatMessageType } from '@/lib/types';

interface ChatbotSheetProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function ChatbotSheet({ isOpen, onOpenChange }: ChatbotSheetProps) {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isPending, startTransition] = useTransition();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSendMessage = (query: string) => {
        const userMessage: ChatMessageType = { id: Date.now().toString(), role: 'user', message: query };
        setMessages(prev => [...prev, userMessage]);

        startTransition(async () => {
            const result = await askAurix(query);
            const assistantMessage: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                message: result.answer
            };
            setMessages(prev => [...prev, assistantMessage]);
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
                <SheetHeader className="p-6">
                    <SheetTitle className="font-headline">Chat with Aurix</SheetTitle>
                    <SheetDescription>
                        Your personal AI programming assistant. Ask me anything about code!
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1" ref={scrollAreaRef}>
                    <div className="p-6 space-y-4">
                        <ChatMessage
                            role="assistant"
                            message="Hello! I'm Aurix. How can I help you with your coding questions today?"
                        />
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} role={msg.role} message={msg.message} />
                        ))}
                         {isPending && (
                            <ChatMessage
                                role="assistant"
                                message="..."
                                isLoading
                            />
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <ChatInput onSendMessage={handleSendMessage} isLoading={isPending} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
