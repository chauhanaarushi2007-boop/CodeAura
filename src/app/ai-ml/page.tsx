
'use client';

import { useState } from 'react';
import { BrainCircuit, Zap, Droplets, Leaf, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const quizQuestions = [
    {
        question: "What does 'GPT' stand for?",
        answers: [
            { text: "General Processing Transformer", correct: false },
            { text: "Generative Pre-trained Transformer", correct: true },
            { text: "Global Parameter Tuning", correct: false },
        ],
        explanation: "'GPT' stands for Generative Pre-trained Transformer, which describes how the model is built: it's trained on vast data (Pre-trained) to generate new text (Generative) using a Transformer architecture."
    },
    {
        question: "What's a key difference between Supervised and Unsupervised learning?",
        answers: [
            { text: "Supervised uses labeled data; Unsupervised uses unlabeled data.", correct: true },
            { text: "Supervised is for classification; Unsupervised is for regression.", correct: false },
            { text: "Unsupervised learning is always faster than Supervised learning.", correct: false },
        ],
        explanation: "The core difference is the data. Supervised learning requires a 'teacher'—data that is already labeled with the correct answers. Unsupervised learning finds patterns on its own without labels."
    },
    {
        question: "What is the 'Attention Mechanism' in Transformers?",
        answers: [
            { text: "A technique to make the model focus on the user's cursor.", correct: false },
            { text: "A way to reduce the model's memory usage.", correct: false },
            { text: "It allows the model to weigh the importance of different words in the input when processing.", correct: true },
        ],
        explanation: "Attention allows the model to 'focus' on relevant parts of the input sequence for a given task, which is crucial for understanding context and relationships in long sentences."
    }
];


export default function NexusAiPage() {
    const [quizState, setQuizState] = useState(quizQuestions.map(() => ({ selected: null, correct: null })));
    const [score, setScore] = useState(0);

    const handleAnswer = (questionIndex: number, answerIndex: number) => {
        const isCorrect = quizQuestions[questionIndex].answers[answerIndex].correct;
        const newQuizState = [...quizState];

        if (newQuizState[questionIndex].selected === null) {
            if (isCorrect) {
                setScore(score + 1);
            }
            newQuizState[questionIndex] = { selected: answerIndex, correct: isCorrect };
            setQuizState(newQuizState);
        }
    };

    return (
        <div className="bg-background text-foreground min-h-screen">
             <style jsx>{`
                .glass-card {
                    background: hsl(var(--card) / 0.5);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid hsl(var(--border) / 0.2);
                }
                .dark .glass-card {
                     background: rgba(255, 255, 255, 0.05);
                     border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .glow {
                    box-shadow: 0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary));
                }
                .hero-bg {
                    background: radial-gradient(ellipse at bottom, hsl(var(--primary) / 0.3), transparent 60%);
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>

            {/* Hero Section */}
            <section className="relative text-center py-20 md:py-32 hero-bg">
                <div className="container relative z-10">
                    <BrainCircuit className="w-24 h-24 mx-auto mb-6 text-primary animate-float" />
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">Master the Future of AI with NexusAI</h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">From Zero to Hero in Generative AI and Neural Networks.</p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow transition-shadow">
                        <a href="#tutorials">Start Learning Now</a>
                    </Button>
                </div>
            </section>

            {/* Trends 2025 Section */}
            <section className="py-20">
                <div className="container">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">AI Trends: 2025 and Beyond</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="glass-card p-8 rounded-xl">
                            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-headline text-xl font-semibold mb-2">Agentic AI</h3>
                            <p className="text-muted-foreground">AI agents that can take actions, automate complex tasks, and interact with digital environments on your behalf.</p>
                        </div>
                        <div className="glass-card p-8 rounded-xl">
                            <Droplets className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-headline text-xl font-semibold mb-2">Multimodal Models</h3>
                            <p className="text-muted-foreground">Single AI models that understand and process text, images, audio, and video simultaneously for richer context.</p>
                        </div>
                        <div className="glass-card p-8 rounded-xl">
                            <Leaf className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-headline text-xl font-semibold mb-2">Sustainable/Green AI</h3>
                            <p className="text-muted-foreground">A focus on creating smaller, highly-efficient models that reduce the energy consumption of AI training and inference.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tutorials Section */}
            <section id="tutorials" className="py-20 bg-muted/30">
                <div className="container">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Curated Tutorials</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="glass-card text-foreground overflow-hidden group">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="font-headline">Intro to LLMs & Transformers</CardTitle>
                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Beginner</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Understand the core architecture that powers models like GPT and Claude.</p>
                                <Link href="https://www.youtube.com/watch?v=wjZofJX0v4M" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="border-border hover:bg-primary/20">Read Notes</Button>
                                </Link>
                            </CardContent>
                        </Card>
                        <Card className="glass-card text-foreground overflow-hidden group">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="font-headline">Building RAG Pipelines</CardTitle>
                                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">Intermediate</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Learn Retrieval-Augmented Generation to connect LLMs with external data.</p>
                                <Link href="https://www.pinecone.io/learn/series/rag/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="border-border hover:bg-primary/20">Read Notes</Button>
                                </Link>
                            </CardContent>
                        </Card>
                        <Card className="glass-card text-foreground overflow-hidden group">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="font-headline">Fine-tuning Llama 3</CardTitle>
                                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Advanced</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Specialize open-source models for your own tasks with hands-on fine-tuning.</p>
                                <Link href="https://huggingface.co/blog/unsloth-llama-3" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="border-border hover:bg-primary/20">Read Notes</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             {/* Interactive Quiz Section */}
            <section className="py-20">
                <div className="container max-w-3xl">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Test Your Knowledge</h2>
                    <div className="space-y-8">
                        {quizQuestions.map((q, qIndex) => (
                            <div key={qIndex} className="glass-card p-6 rounded-lg">
                                <p className="font-semibold text-lg mb-4">{qIndex + 1}. {q.question}</p>
                                <div className="space-y-3">
                                    {q.answers.map((ans, aIndex) => {
                                        const isSelected = quizState[qIndex].selected === aIndex;
                                        const isCorrect = ans.correct;
                                        const state = quizState[qIndex];

                                        return (
                                            <button
                                                key={aIndex}
                                                onClick={() => handleAnswer(qIndex, aIndex)}
                                                disabled={state.selected !== null}
                                                className={cn(
                                                    "w-full text-left p-3 rounded-md transition-all duration-300 border",
                                                    "disabled:cursor-not-allowed",
                                                    state.selected === null 
                                                        ? "border-border hover:bg-primary/10 hover:border-primary" 
                                                        : isSelected && isCorrect ? "bg-green-500/20 border-green-500"
                                                        : isSelected && !isCorrect ? "bg-red-500/20 border-red-500"
                                                        : "border-border/50 opacity-50"
                                                )}
                                            >
                                                {ans.text}
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizState[qIndex].selected !== null && (
                                    <div className={cn(
                                        "mt-4 p-3 rounded-md text-sm",
                                        quizState[qIndex].correct ? "bg-green-500/10 text-green-200" : "bg-red-500/10 text-red-200"
                                    )}>
                                        <p className="font-bold mb-1">{quizState[qIndex].correct ? "Correct!" : "Not quite."}</p>
                                        <p className="text-foreground/80">{q.explanation}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {quizState.every(s => s.selected !== null) && (
                         <div className="text-center mt-12">
                            <p className="text-2xl font-bold">Your Score: {score} / {quizQuestions.length}</p>
                        </div>
                    )}
                </div>
            </section>

             {/* Cheat Sheet Section */}
            <section className="py-20 bg-muted/30">
                <div className="container max-w-4xl">
                     <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Quick Recall Notes</h2>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="glass-card rounded-lg mb-4 px-6">
                            <AccordionTrigger className="font-headline text-lg hover:no-underline">Python Libraries: PyTorch vs TensorFlow</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                <p><strong>PyTorch:</strong> Known for its Python-first approach, flexibility, and ease of use in research. Uses dynamic computation graphs.</p>
                                <p className="mt-2"><strong>TensorFlow:</strong> Known for its robust production deployment capabilities (TensorFlow Serving), scalability, and strong mobile support (TensorFlow Lite). Traditionally used static computation graphs, but TF 2.0 introduced eager execution.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="glass-card rounded-lg px-6">
                            <AccordionTrigger className="font-headline text-lg hover:no-underline">Common Activation Functions</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                <p><strong>ReLU (Rectified Linear Unit):</strong> `f(x) = max(0, x)`. The most common activation function. Computationally efficient but can suffer from "dying ReLU" problem.</p>
                                <p className="mt-2"><strong>Sigmoid:</strong> `f(x) = 1 / (1 + e^-x)`. Squashes values between 0 and 1. Used in binary classification output layers.</p>
                                <p className="mt-2"><strong>Softmax:</strong> Converts a vector of numbers into a probability distribution. Used in multi-class classification output layers.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>


            {/* Footer */}
            <footer className="py-12 border-t border-border/20">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                             <h3 className="font-headline text-lg mb-2">NexusAI</h3>
                             <p className="text-muted-foreground text-sm">© {new Date().getFullYear()}. All Rights Reserved.</p>
                        </div>
                        <div>
                            <h3 className="font-headline text-lg mb-2">Resources</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#tutorials" className="text-muted-foreground hover:text-primary">Tutorials</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary">Kaggle</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary">Hugging Face</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-headline text-lg mb-2">Newsletter</h3>
                            <p className="text-muted-foreground text-sm mb-4">Stay updated with the latest in AI.</p>
                            <form className="flex space-x-2">
                                <Input type="email" placeholder="Enter your email" className="bg-background/50 border-border text-foreground" />
                                <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

    