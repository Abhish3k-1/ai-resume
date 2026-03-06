"use client";

import { useResume } from "@/context/ResumeContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, LayoutTemplate, ChevronRight, Search, FileText } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import templates, { ResumeTemplate } from "@/lib/templates";
import { useState, useMemo } from "react";

const categories = ["All", "Modern", "Classic", "Creative", "Corporate", "Tech"];

function TemplateCard({
    template,
    index,
    onSelect,
}: {
    template: ResumeTemplate;
    index: number;
    onSelect: (id: string) => void;
}) {
    const isDark =
        template.id === "dark-luxe" ||
        template.id === "midnight-royal" ||
        template.id === "neon-developer";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => onSelect(template.id)}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-xl hover:bg-white/10 transition-all overflow-hidden"
        >
            {/* Preview Stripe */}
            <div
                className="h-36 relative overflow-hidden flex items-end p-4"
                style={{ background: template.previewBg }}
            >
                {/* Fake mini resume lines */}
                <div className="absolute inset-3 flex flex-col gap-1.5 opacity-60">
                    <div
                        className="h-3 w-3/5 rounded"
                        style={{ background: template.color }}
                    />
                    <div className="h-1.5 w-4/5 rounded bg-gray-300" />
                    <div className="h-1.5 w-3/5 rounded bg-gray-300" />
                    <div className="mt-2 h-1 w-2/5 rounded" style={{ background: template.color, opacity: 0.6 }} />
                    <div className="h-1.5 w-full rounded bg-gray-200" />
                    <div className="h-1.5 w-full rounded bg-gray-200" />
                    <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                    <div className="mt-2 h-1 w-2/5 rounded" style={{ background: template.color, opacity: 0.6 }} />
                    <div className="h-1.5 w-full rounded bg-gray-200" />
                    <div className="h-1.5 w-3/5 rounded bg-gray-200" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="hidden group-hover:flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#0f0b1a]/90 text-sm font-semibold text-white shadow-lg backdrop-blur-sm"
                    >
                        Use Template
                        <ChevronRight className="h-4 w-4" />
                    </motion.span>
                </div>

                {/* Category badge */}
                <span
                    className="relative z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                    style={{
                        background: isDark ? "rgba(255,255,255,0.15)" : `${template.color}15`,
                        color: isDark ? "#fff" : template.color,
                    }}
                >
                    {template.category}
                </span>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {template.name}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                    {template.description}
                </p>

                {/* Accent bar */}
                <div className="mt-3 flex items-center gap-2">
                    <div
                        className="h-1.5 w-8 rounded-full"
                        style={{ background: template.color }}
                    />
                    <div
                        className="h-1.5 w-4 rounded-full opacity-50"
                        style={{ background: template.color }}
                    />
                    <div
                        className="h-1.5 w-2 rounded-full opacity-25"
                        style={{ background: template.color }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function TemplatesPage() {
    const { setResumeData, setSelectedTemplateId } = useResume();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filteredTemplates = useMemo(() => {
        return templates.filter((t) => {
            const matchesCategory =
                activeCategory === "All" || t.category === activeCategory;
            const matchesSearch =
                !search ||
                t.name.toLowerCase().includes(search.toLowerCase()) ||
                t.description.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, search]);

    const handleSelect = (id: string) => {
        setSelectedTemplateId(id);
        setResumeData((prev) => ({ ...prev, templateId: id }));
        router.push("/builder");
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
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Title section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                        <LayoutTemplate className="h-4 w-4" />
                        20 Professional Templates
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Choose Your{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Template
                        </span>
                    </h1>
                    <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
                        Pick a design that matches your style. Each template is
                        ATS-optimized and professionally crafted.
                    </p>
                </motion.div>

                {/* Filters Row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
                >
                    {/* Category pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeCategory === cat
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                                    : "bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                            <Search className="h-3.5 w-3.5 text-white" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search templates..."
                            className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm pl-12 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/20 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTemplates.map((template, i) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={i}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <LayoutTemplate className="h-12 w-12 mx-auto mb-4 opacity-40" />
                        <p className="text-lg font-medium">No templates found</p>
                        <p className="text-sm mt-1">Try a different search or category</p>
                    </div>
                )}
            </main>
        </div>
    );
}
