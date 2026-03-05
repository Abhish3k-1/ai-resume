"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-gray-950/70"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 transition-shadow group-hover:shadow-indigo-500/40">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ResumeAI
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    {["Features", "How It Works", "Pricing"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50/50"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-xl hover:bg-indigo-50/50"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-[1.02]"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5 text-gray-700" />
                    ) : (
                        <Menu className="h-5 w-5 text-gray-700" />
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden border-t border-white/10 bg-white/90 backdrop-blur-xl dark:bg-gray-950/90"
                    >
                        <div className="flex flex-col gap-2 px-6 py-4">
                            {["Features", "How It Works", "Pricing"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/50 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                                <Link
                                    href="/login"
                                    className="px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50/50 text-center transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-center shadow-lg shadow-indigo-500/25 transition-all"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
