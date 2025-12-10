import { Shield, Network, Lock, Code, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function EthicalHackingPage() {
  const phases = [
    { title: "Reconnaissance", description: "Gathering information about the target system. This can be passive (e.g., searching public records) or active (e.g., scanning the network)." },
    { title: "Scanning", description: "Using tools to identify open ports, running services, and vulnerabilities on the target system." },
    { title: "Gaining Access", description: "Exploiting identified vulnerabilities to gain access to the system. This could involve web app attacks, network attacks, or social engineering." },
    { title: "Maintaining Access", description: "Installing backdoors or other mechanisms to maintain access to the compromised system for future use." },
    { title: "Covering Tracks", description: "Removing evidence of the hacking activity, such as clearing logs, to avoid detection." },
  ];

  const concepts = [
    { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", description: "A standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications." },
    { title: "Penetration Testing", url: "https://www.comptia.org/content/articles/what-is-penetration-testing", description: "A simulated cyber attack against your computer system to check for exploitable vulnerabilities. It's a key part of ethical hacking." },
    { title: "Social Engineering", url: "https://www.imperva.com/learn/application-security/social-engineering-attack/", description: "The art of manipulating people so they give up confidential information. Phishing is a common example." },
  ];

  return (
    <div className="container py-12">
      <header className="mb-12 text-center">
        <Shield className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Introduction to Ethical Hacking
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Understand the mindset and methodologies of ethical hackers to protect systems from malicious attacks.
        </p>
      </header>

      <Card className="mb-12 bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-destructive" />
            What is Ethical Hacking?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ethical hacking, also known as penetration testing or white-hat hacking, involves legally breaking into computers and devices to test an organization's defenses. It's one of the most exciting IT jobs any person can be involved in. You are literally getting paid to keep up with the latest technology and to get to break into computers without the threat of being arrested.
          </p>
        </CardContent>
      </Card>
      
      <section className="mb-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">The Five Phases of Hacking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, index) => (
            <Card key={phase.title} className={cn("h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">{index + 1}</div>
                  {phase.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{phase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Key Concepts & Resources</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {concepts.map((concept) => (
            <Link href={concept.url} target="_blank" rel="noopener noreferrer" key={concept.title} className="block group">
              <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{concept.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{concept.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}