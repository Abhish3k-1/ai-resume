"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [welcome, setWelcome] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            console.error("Login error:", authError);
            setError(authError.message || "Failed to authenticate. Please check your credentials.");
            setLoading(false);
            return;
        }

        const username =
            data.user?.user_metadata?.username || email.split("@")[0];
        setWelcome(`Welcome back, ${username}`);

        setTimeout(() => {
            router.push("/templates");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
                <div className="absolute inset-0">
                    <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-pink-400/20 blur-3xl" />
                    <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-indigo-400/20 blur-2xl" />
                </div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-md text-white"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold">ResumeAI</span>
                    </div>
                    <h2 className="text-4xl font-bold leading-tight mb-4">
                        Build an ATS Optimized Resume with AI
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed">
                        Create professional, tailored resumes in seconds. Get past ATS
                        filters and into interviews faster.
                    </p>
                </motion.div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#0f0b1a]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {welcome ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-xl shadow-indigo-500/25">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{welcome}</h2>
                            <p className="mt-2 text-gray-400">Redirecting to your dashboard...</p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white">
                                    Welcome back
                                </h1>
                                <p className="mt-2 text-gray-400">
                                    Sign in to your account to continue
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="you@email.com"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? "Signing in..." : "Login"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </motion.button>
                            </form>

                            <p className="mt-6 text-center text-sm text-gray-500">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
