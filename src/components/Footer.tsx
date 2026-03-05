import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-950/50">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        {["Privacy", "Terms", "Contact"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} ResumeAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
