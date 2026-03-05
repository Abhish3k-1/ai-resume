"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [welcome, setWelcome] = useState("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            },
        });

        if (authError) {
            console.error("Signup error:", authError);
            setError(authError.message || "Failed to create account. Please try again.");
            setLoading(false);
            return;
        }

        setWelcome(`Welcome ${username}! Your account has been created.`);

        setTimeout(() => {
            router.push("/builder");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-400/20 blur-3xl" />
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
                        Start Building Your Professional Resume Today
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed">
                        Join thousands of professionals who use AI to create standout
                        resumes that get interviews.
                    </p>
                </motion.div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-8">
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
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mx-auto mb-6 shadow-xl shadow-purple-500/25">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{welcome}</h2>
                            <p className="mt-2 text-gray-500">
                                Redirecting to the builder...
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Create your account
                                </h1>
                                <p className="mt-2 text-gray-500">
                                    Get started building your AI-powered resume
                                </p>
                            </div>

                            <form onSubmit={handleSignup} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            placeholder="johndoe"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="you@email.com"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? "Creating account..." : "Sign Up"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </motion.button>
                            </form>

                            <p className="mt-6 text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Login
                                </Link>
                            </p>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
