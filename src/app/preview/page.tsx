"use client";

import ResumePreview from "@/components/ResumePreview";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function PreviewPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl animate-pulse" />
                <div className="absolute -top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-200/30 blur-3xl animate-pulse [animation-delay:1s]" />
                <div className="absolute bottom-[20%] left-[30%] h-[700px] w-[700px] rounded-full bg-blue-200/20 blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl"
            >
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 transition-shadow group-hover:shadow-indigo-500/40">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </Link>
                    <LogoutButton />
                </div>
            </motion.header>

            {/* Main */}
            <main className="mx-auto max-w-5xl px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Resume is Ready
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Review your AI-generated resume below and download it as PDF.
                    </p>
                </motion.div>

                <ResumePreview />
            </main>
        </div>
    );
}
