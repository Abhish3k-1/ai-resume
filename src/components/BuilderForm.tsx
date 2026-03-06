"use client";

import { useResume } from "@/context/ResumeContext";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Briefcase,
    User,
    GraduationCap,
    Wrench,
    FolderOpen,
    Award,
    Plus,
    Trash2,
    Sparkles,
} from "lucide-react";

/* ---------- tiny helpers ---------- */

function SectionCard({
    icon: Icon,
    title,
    children,
    delay = 0,
}: {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
            {children}
        </motion.section>
    );
}

function Input({
    label,
    ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {label}
            </label>
            <input
                {...props}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/20 transition-all"
            />
        </div>
    );
}

function TextArea({
    label,
    ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {label}
            </label>
            <textarea
                {...props}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/20 transition-all resize-none"
            />
        </div>
    );
}

/* ---------- main component ---------- */

export default function BuilderForm() {
    const { resumeData, setResumeData, setGeneratedHtml, setIsGenerating } =
        useResume();
    const router = useRouter();

    /* --- field updaters --- */
    const update = (field: string, value: string) =>
        setResumeData((d) => ({ ...d, [field]: value }));

    const updateArrayItem = (
        section: "experience" | "education" | "projects" | "certifications",
        index: number,
        field: string,
        value: string
    ) =>
        setResumeData((d) => ({
            ...d,
            [section]: d[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));

    const addItem = (section: "experience" | "education" | "projects" | "certifications") => {
        const templates: Record<string, object> = {
            experience: { title: "", company: "", location: "", startDate: "", endDate: "", description: "" },
            education: { degree: "", institution: "", location: "", graduationDate: "", gpa: "" },
            projects: { name: "", description: "", technologies: "", link: "" },
            certifications: { name: "", issuer: "", date: "" },
        };
        setResumeData((d) => ({
            ...d,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [section]: [...(d as any)[section], templates[section]],
        }));
    };

    const removeItem = (section: "experience" | "education" | "projects" | "certifications", index: number) =>
        setResumeData((d) => ({
            ...d,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [section]: (d as any)[section].filter((_: unknown, i: number) => i !== index),
        }));

    /* --- skills helpers --- */
    const updateSkill = (index: number, value: string) =>
        setResumeData((d) => ({
            ...d,
            skills: d.skills.map((s, i) => (i === index ? value : s)),
        }));

    const addSkill = () =>
        setResumeData((d) => ({ ...d, skills: [...d.skills, ""] }));

    const removeSkill = (index: number) =>
        setResumeData((d) => ({
            ...d,
            skills: d.skills.filter((_, i) => i !== index),
        }));

    /* --- submit --- */
    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch("/api/generate-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resumeData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Generation failed");

            setGeneratedHtml(data.html);

            // Save to Supabase (keep only the latest resume per user)
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                // Delete any previous resumes for this user
                await supabase
                    .from("resumes")
                    .delete()
                    .eq("user_id", user.id);

                // Insert the new resume
                await supabase.from("resumes").insert({
                    user_id: user.id,
                    target_role: resumeData.targetRole,
                    resume_data: resumeData,
                    generated_html: data.html,
                });
            }
            router.push("/preview");
        } catch (err) {
            console.error(err);
            alert("Resume generation failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    /* ======================== RENDER ======================== */

    return (
        <div className="flex flex-col gap-6">
            {/* Target Role */}
            <SectionCard icon={Briefcase} title="Target Job Role" delay={0}>
                <Input
                    label="Job Title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={resumeData.targetRole}
                    onChange={(e) => update("targetRole", e.target.value)}
                />
            </SectionCard>

            {/* Personal Info */}
            <SectionCard icon={User} title="Personal Information" delay={0.05}>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Full Name" placeholder="John Doe" value={resumeData.fullName} onChange={(e) => update("fullName", e.target.value)} />
                    <Input label="Email" placeholder="john@email.com" value={resumeData.email} onChange={(e) => update("email", e.target.value)} />
                    <Input label="Phone" placeholder="+1 234 567 890" value={resumeData.phone} onChange={(e) => update("phone", e.target.value)} />
                    <Input label="Location" placeholder="San Francisco, CA" value={resumeData.location} onChange={(e) => update("location", e.target.value)} />
                    <Input label="LinkedIn" placeholder="linkedin.com/in/johndoe" value={resumeData.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
                </div>
            </SectionCard>

            {/* Experience */}
            <SectionCard icon={Briefcase} title="Experience (Optional)" delay={0.1}>
                {resumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 relative">
                        {resumeData.experience.length > 1 && (
                            <button onClick={() => removeItem("experience", i)} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="Job Title" placeholder="Software Engineer" value={exp.title} onChange={(e) => updateArrayItem("experience", i, "title", e.target.value)} />
                            <Input label="Company" placeholder="Google" value={exp.company} onChange={(e) => updateArrayItem("experience", i, "company", e.target.value)} />
                            <Input label="Location" placeholder="Mountain View, CA" value={exp.location} onChange={(e) => updateArrayItem("experience", i, "location", e.target.value)} />
                            <Input label="Start Date" placeholder="Jan 2022" value={exp.startDate} onChange={(e) => updateArrayItem("experience", i, "startDate", e.target.value)} />
                            <Input label="End Date" placeholder="Present" value={exp.endDate} onChange={(e) => updateArrayItem("experience", i, "endDate", e.target.value)} />
                        </div>
                        <div className="mt-4">
                            <TextArea label="Description" placeholder="Key achievements and responsibilities..." value={exp.description} onChange={(e) => updateArrayItem("experience", i, "description", e.target.value)} />
                        </div>
                    </div>
                ))}
                <button onClick={() => addItem("experience")} className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    <Plus className="h-4 w-4" /> Add Experience
                </button>
            </SectionCard>

            {/* Education */}
            <SectionCard icon={GraduationCap} title="Education (Optional)" delay={0.15}>
                {resumeData.education.map((edu, i) => (
                    <div key={i} className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 relative">
                        {resumeData.education.length > 1 && (
                            <button onClick={() => removeItem("education", i)} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="Degree" placeholder="B.S. Computer Science" value={edu.degree} onChange={(e) => updateArrayItem("education", i, "degree", e.target.value)} />
                            <Input label="Institution" placeholder="MIT" value={edu.institution} onChange={(e) => updateArrayItem("education", i, "institution", e.target.value)} />
                            <Input label="Location" placeholder="Cambridge, MA" value={edu.location} onChange={(e) => updateArrayItem("education", i, "location", e.target.value)} />
                            <Input label="Graduation Date" placeholder="May 2023" value={edu.graduationDate} onChange={(e) => updateArrayItem("education", i, "graduationDate", e.target.value)} />
                            <Input label="GPA" placeholder="3.9" value={edu.gpa} onChange={(e) => updateArrayItem("education", i, "gpa", e.target.value)} />
                        </div>
                    </div>
                ))}
                <button onClick={() => addItem("education")} className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    <Plus className="h-4 w-4" /> Add Education
                </button>
            </SectionCard>

            {/* Skills */}
            <SectionCard icon={Wrench} title="Skills (Optional)" delay={0.2}>
                <div className="flex flex-wrap gap-3">
                    {resumeData.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <input
                                value={skill}
                                placeholder="e.g. React"
                                onChange={(e) => updateSkill(i, e.target.value)}
                                className="w-36 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/20 transition-all"
                            />
                            {resumeData.skills.length > 1 && (
                                <button onClick={() => removeSkill(i)} className="p-1 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={addSkill} className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    <Plus className="h-4 w-4" /> Add Skill
                </button>
            </SectionCard>

            {/* Projects */}
            <SectionCard icon={FolderOpen} title="Projects (Optional)" delay={0.25}>
                {resumeData.projects.map((proj, i) => (
                    <div key={i} className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 relative">
                        {resumeData.projects.length > 1 && (
                            <button onClick={() => removeItem("projects", i)} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="Project Name" placeholder="My Awesome App" value={proj.name} onChange={(e) => updateArrayItem("projects", i, "name", e.target.value)} />
                            <Input label="Technologies" placeholder="React, Node.js" value={proj.technologies} onChange={(e) => updateArrayItem("projects", i, "technologies", e.target.value)} />
                            <Input label="Link" placeholder="https://github.com/..." value={proj.link} onChange={(e) => updateArrayItem("projects", i, "link", e.target.value)} />
                        </div>
                        <div className="mt-4">
                            <TextArea label="Description" placeholder="What does this project do?" value={proj.description} onChange={(e) => updateArrayItem("projects", i, "description", e.target.value)} />
                        </div>
                    </div>
                ))}
                <button onClick={() => addItem("projects")} className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    <Plus className="h-4 w-4" /> Add Project
                </button>
            </SectionCard>

            {/* Certifications */}
            <SectionCard icon={Award} title="Certifications (Optional)" delay={0.3}>
                {resumeData.certifications.map((cert, i) => (
                    <div key={i} className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 relative">
                        {resumeData.certifications.length > 1 && (
                            <button onClick={() => removeItem("certifications", i)} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="Certification Name" placeholder="AWS Solutions Architect" value={cert.name} onChange={(e) => updateArrayItem("certifications", i, "name", e.target.value)} />
                            <Input label="Issuer" placeholder="Amazon" value={cert.issuer} onChange={(e) => updateArrayItem("certifications", i, "issuer", e.target.value)} />
                            <Input label="Date" placeholder="Dec 2023" value={cert.date} onChange={(e) => updateArrayItem("certifications", i, "date", e.target.value)} />
                        </div>
                    </div>
                ))}
                <button onClick={() => addItem("certifications")} className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                    <Plus className="h-4 w-4" /> Add Certification
                </button>
            </SectionCard>

            {/* Generate Button */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
            >
                <Sparkles className="h-5 w-5" />
                Generate Resume
            </motion.button>
        </div>
    );
}
