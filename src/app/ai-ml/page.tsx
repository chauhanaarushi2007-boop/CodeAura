
import { BrainCircuit, Cpu, Bot, BookOpen, GraduationCap, Link as LinkIcon, Languages, LineChart, Code, ArrowRight, Book, Globe, Layers, Database, Puzzle, TestTube, Rocket, Python } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";

const workflowSteps = [
    {
        title: "1. Frame the Problem",
        description: "What question are you trying to answer? Is it predicting a price (regression) or classifying an image (classification)?",
        icon: Puzzle
    },
    {
        title: "2. Get the Data",
        description: "Collect or find a quality dataset. This is the fuel for your model.",
        icon: Database
    },
    {
        title: "3. Explore & Prepare Data",
        description: "Clean the data, handle missing values, and transform it into a usable format. This is often 80% of the work!",
        icon: TestTube
    },
    {
        title: "4. Train the Model",
        description: "Feed the prepared data to a machine learning algorithm to 'learn' patterns.",
        icon: BrainCircuit
    },
    {
        title: "5. Evaluate the Model",
        description: "Test the model's performance on data it has never seen before to see how well it performs.",
        icon: GraduationCap
    },
    {
        title: "6. Deploy & Monitor",
        description: "Integrate your model into an application and monitor its performance in the real world.",
        icon: Rocket
    }
];

const externalResources = [
  {
    name: "Google's ML Crash Course",
    description: "A fast-paced, practical introduction to machine learning with video lectures and real-world case studies.",
    href: "https://developers.google.com/machine-learning/crash-course",
    icon: Code,
  },
  {
    name: "fast.ai",
    description: "A top-down, code-first approach to learning deep learning. Highly practical and respected in the industry.",
    href: "https://www.fast.ai/",
    icon: Rocket,
  },
  {
    name: "Kaggle",
    description: "Practice your skills with real-world datasets and competitions. The best way to learn is by doing.",
    href: "https://www.kaggle.com/learn",
    icon: Cpu,
  },
];

const exampleCode = `
# This is a simplified example using PyTorch
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# 1. Load a pre-trained model (ResNet)
model = models.resnet18(pretrained=True)
model.eval()

# 2. Define image transformations
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# 3. Load and process an image (you'd need a 'cat.jpg' file)
# img = Image.open("cat.jpg")
# img_t = preprocess(img)
# batch_t = torch.unsqueeze(img_t, 0)

# 4. Make a prediction
# with torch.no_grad():
#     output = model(batch_t)

# (Additional code would be needed to map output to a label like 'cat')
print("Model loaded and ready to classify!")
`;


export default function AiMlPage() {

  return (
    <div className="container py-12">
      <header className="mb-16 text-center">
        <Bot className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Your Journey into Machine Learning
        </h1>
        <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
          Machine learning is teaching computers to find patterns and make decisions from data. It's the science of getting computers to act without being explicitly programmed. Welcome to your starting point.
        </p>
      </header>
      
      <section className="mb-16">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">The Three Pillars of Machine Learning</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                Most ML problems fall into one of three categories.
            </p>
         </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">1. Supervised Learning</CardTitle>
                    <CardDescription>Learning from Labeled Data</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You give the model examples with the correct answers (e.g., pictures of cats labeled "cat"). The model learns the relationship between the examples and the answers. This is used for tasks like spam detection and image classification.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">2. Unsupervised Learning</CardTitle>
                    <CardDescription>Finding Hidden Patterns</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You give the model data without any labels and ask it to find patterns on its own. This is useful for customer segmentation (grouping similar customers) or anomaly detection (finding unusual behavior).</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">3. Reinforcement Learning</CardTitle>
                    <CardDescription>Learning through Trial & Error</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The model (an "agent") learns by taking actions in an environment and receiving rewards or penalties. It's how AI is trained to play games like Chess or Go, or to control robotic arms.</p>
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="mb-16 bg-card/50 py-16 rounded-lg">
         <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">The Machine Learning Workflow</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                A typical ML project follows a standard set of steps, from idea to deployment.
            </p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workflowSteps.map((step) => {
                const Icon = step.icon;
                return (
                    <Card key={step.title} className="bg-background/70">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
         </div>
      </section>
      
      <section className="mb-16">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">Your First Project: Image Classification</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                Let's see what real code looks like. This example uses PyTorch, a popular Deep Learning library, to classify an image. This is a practical, hands-on approach inspired by fast.ai.
            </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><Python className="w-6 h-6 text-blue-500" /> Image Classification in Python</CardTitle>
                    <CardDescription>This code loads a pre-trained neural network (ResNet18) and prepares it to classify a new image. Don't worry if it looks complex; the key is understanding the steps.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CodeBlock code={exampleCode} language="python" />
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="bg-card/50 py-16 rounded-lg">
         <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">Where to Go Next?</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                You've seen the map. Now it's time to start the journey. These resources are the best in the world for taking your next steps.
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {externalResources.map((platform) => {
            const Icon = platform.icon;
            return (
              <Link href={platform.href} key={platform.name} className="group" target="_blank" rel="noopener noreferrer">
                <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 bg-background">
                  <CardHeader>
                     <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                          <Icon className="w-8 h-8" />
                        </div>
                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{platform.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{platform.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                      <div className="text-sm font-medium text-primary flex items-center gap-1">
                          Start Learning
                          <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  );
}
