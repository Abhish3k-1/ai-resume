"use client";

import { useResume } from "@/context/ResumeContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import { useRef } from "react";

export default function ResumePreview() {
    const { generatedHtml } = useResume();
    const router = useRouter();
    const resumeRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!resumeRef.current) return;
        // Dynamic import to keep bundle small
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

    if (!generatedHtml) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-24">
                <p className="text-gray-500">No resume generated yet.</p>
                <button
                    onClick={() => router.push("/builder")}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go to Builder
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
        >
            {/* Action buttons */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/builder")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Builder
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                >
                    <Download className="h-4 w-4" />
                    Download PDF
                </button>
            </div>

            {/* Resume document wrapper with responsive scaling */}
            <div className="w-full flex justify-center pb-8 overflow-hidden rounded-xl bg-gray-50/50 sm:bg-transparent">
                <div className="rounded-sm border border-gray-200/60 bg-white shadow-2xl shrink-0 print:border-none print:shadow-none print:transform-none origin-top transition-transform duration-300 transform scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-100">
                    <div
                        ref={resumeRef}
                        className="prose prose-sm max-w-none text-black"
                        style={{ width: "210mm", minHeight: "297mm" }}
                        dangerouslySetInnerHTML={{ __html: generatedHtml }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
