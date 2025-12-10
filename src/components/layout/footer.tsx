import { CodeXml } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-card text-card-foreground">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Link href="/" className="flex items-center space-x-2">
                        <CodeXml className="h-6 w-6 text-primary" />
                        <p className="text-lg font-bold font-headline">CodeAura</p>
                    </Link>
                </div>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} CodeAura. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
