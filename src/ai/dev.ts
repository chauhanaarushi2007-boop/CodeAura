import { config } from 'dotenv';
config();

import '@/ai/flows/chatbot-code-explanation.ts';
import '@/ai/flows/chatbot-programming-language-query.ts';
import '@/ai/flows/generate-code-snippet-from-description.ts';
import '@/ai/flows/run-code.ts';
import '@/ai/flows/debug-code.ts';
import '@/ai/flows/find-free-courses.ts';
import '@/ai/flows/analyze-review.ts';
import '@/ai/flows/submit-public-review.ts';
