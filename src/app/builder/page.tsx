"use client";

import { useResume } from "@/context/ResumeContext";
import BuilderForm from "@/components/BuilderForm";
import AnimatedLoader from "@/components/AnimatedLoader";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, LayoutTemplate, FileText } from "lucide-react";
import { getTemplateById } from "@/lib/templates";

export default function BuilderPage() {
    const { isGenerating, selectedTemplateId } = useResume();
    const template = getTemplateById(selectedTemplateId);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-200/30 blur-3xl animate-pulse [animation-delay:1s]" />
                <div className="absolute -bottom-[20%] left-[20%] h-[700px] w-[700px] rounded-full bg-blue-200/20 blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0f0b1a]/80 backdrop-blur-xl"
            >
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link href="/templates" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 transition-shadow group-hover:shadow-indigo-500/40">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/my-resume"
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                        >
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">My Resume</span>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </motion.header>

            {/* Main */}
            <main className="mx-auto max-w-3xl px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white">Resume Builder</h1>
                    <p className="mt-2 text-gray-400">
                        Fill in your details and let AI craft the perfect resume for you.
                    </p>

                    {/* Template indicator */}
                    {template && (
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-sm">
                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{ background: template.color }}
                                />
                                <span className="text-gray-400">
                                    Template:{" "}
                                    <span className="font-semibold text-white">
                                        {template.name}
                                    </span>
                                </span>
                            </div>
                            <Link
                                href="/templates"
                                className="flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <LayoutTemplate className="h-3.5 w-3.5" />
                                Change
                            </Link>
                        </div>
                    )}
                </motion.div>

                {isGenerating ? <AnimatedLoader /> : <BuilderForm />}
            </main>
        </div>
    );
}

