"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Download,
    LayoutTemplate,
    FileText,
    Loader2,
    Trash2,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { createClient } from "@/utils/supabase/client";

interface SavedResume {
    id: string;
    target_role: string;
    generated_html: string;
    created_at: string;
}

export default function MyResumePage() {
    const [resume, setResume] = useState<SavedResume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchResume() {
            try {
                const supabase = createClient();
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    router.push("/login");
                    return;
                }

                const { data, error: fetchError } = await supabase
                    .from("resumes")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (fetchError) {
                    console.error("Supabase error:", fetchError);
                    setError("Failed to load your resume.");
                } else {
                    setResume(data);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load your resume. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchResume();
    }, [router]);

    const handleDownload = async () => {
        if (!resumeRef.current) return;
        const html2pdf = (await import("html2pdf.js")).default;
        html2pdf()
            .set({
                margin: 0,
                filename: "resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            })
            .from(resumeRef.current)
            .save();
    };

    const handleDeleteConfirm = async () => {
        if (!resume) return;

        setDeleting(true);
        try {
            const supabase = createClient();
            const { error: deleteError } = await supabase
                .from("resumes")
                .delete()
                .eq("id", resume.id);

            if (deleteError) {
                console.error("Delete error:", deleteError);
                alert("Failed to delete resume. Please try again.");
            } else {
                setResume(null);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete resume. Please try again.");
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background */}
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
                            href="/templates"
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                        >
                            <LayoutTemplate className="h-4 w-4" />
                            <span className="hidden sm:inline">Templates</span>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </motion.header>

            {/* Main */}
            <main className="mx-auto max-w-5xl px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white">My Resume</h1>
                    <p className="mt-2 text-gray-400">
                        Your most recently generated resume, ready to download anytime.
                    </p>
                </motion.div>

                {/* Loading state */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 gap-4"
                    >
                        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
                        <p className="text-gray-400">Loading your resume...</p>
                    </motion.div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <p className="text-red-400 bg-red-500/10 rounded-xl px-6 py-4 inline-block border border-red-500/20">
                            {error}
                        </p>
                    </motion.div>
                )}

                {/* Empty state */}
                {!loading && !error && !resume && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 gap-6"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                            <FileText className="h-10 w-10 text-indigo-400" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-white">
                                No resume yet
                            </h2>
                            <p className="mt-2 text-gray-400 max-w-sm">
                                You haven&apos;t generated a resume yet. Pick a template and
                                build one!
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/templates")}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                        >
                            <LayoutTemplate className="h-4 w-4" />
                            Choose a Template
                        </button>
                    </motion.div>
                )}

                {/* Resume found */}
                {!loading && !error && resume && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-8"
                    >
                        {/* Meta info + Actions */}
                        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Target Role
                                </p>
                                <p className="text-lg font-semibold text-white">
                                    {resume.target_role || "General"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Generated{" "}
                                    {new Date(resume.created_at).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={() => router.push("/templates")}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                                >
                                    <LayoutTemplate className="h-4 w-4" />
                                    New Resume
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Resume document */}
                        <div className="w-full flex justify-center pb-8 overflow-hidden rounded-xl bg-gray-50/50 sm:bg-transparent">
                            <div className="rounded-sm border border-gray-200/60 bg-white shadow-2xl shrink-0 print:border-none print:shadow-none print:transform-none origin-top transition-transform duration-300 transform scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-100">
                                <div
                                    ref={resumeRef}
                                    className="prose prose-sm max-w-none text-black"
                                    style={{ width: "210mm", minHeight: "297mm" }}
                                    dangerouslySetInnerHTML={{
                                        __html: resume.generated_html,
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => !deleting && setShowDeleteModal(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#130f24] p-6 shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
                                    <Trash2 className="h-7 w-7 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Delete Resume?
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-400">
                                        This will permanently delete your saved resume.
                                        This action cannot be undone.
                                    </p>
                                </div>
                                <div className="flex w-full gap-3 mt-2">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        disabled={deleting}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteConfirm}
                                        disabled={deleting}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        {deleting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
