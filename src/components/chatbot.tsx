"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare } from "lucide-react";
import { ChatbotSheet } from '@/components/chatbot/chatbot-sheet';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    size="icon"
                    className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary))] transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary))]"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chatbot"
                >
                    <MessageSquare className="h-8 w-8" />
                </Button>
            </div>
            <ChatbotSheet isOpen={isOpen} onOpenChange={setIsOpen} />
        </>
    );
}
