export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-center text-sm text-muted-foreground">
                        © {currentYear}{' '}
                        <a 
                            href="https://vitthalgoel.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-foreground font-medium hover:text-primary transition-colors duration-200 hover:underline"
                        >
                            Vitthal Goel
                        </a>
                        . All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
