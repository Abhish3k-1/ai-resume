"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, FileText, Download, Zap, ArrowRight, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Generation",
    desc: "Leverage cutting-edge AI to craft professional resumes tailored to your target role in seconds.",
    gradient: "from-indigo-500 to-violet-500",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: FileText,
    title: "ATS Optimized Resume",
    desc: "Every resume is optimized for Applicant Tracking Systems so your application gets through.",
    gradient: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/20",
  },
  {
    icon: Shield,
    title: "20+ Premium Templates",
    desc: "Choose from a curated collection of professionally designed templates across multiple styles.",
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/20",
  },
  {
    icon: Download,
    title: "Instant PDF Download",
    desc: "Download your polished resume as a print-ready PDF with a single click.",
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
  },
];

const stats = [
  { value: "20+", label: "Templates" },
  { value: "AI", label: "Powered" },
  { value: "PDF", label: "Export" },
  { value: "ATS", label: "Optimized" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-36 pb-28 overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-pink-500/8 blur-[100px] animate-pulse [animation-delay:2s]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-indigo-300 shadow-sm shadow-indigo-500/10"
          >
            <Zap className="h-4 w-4 text-indigo-400" />
            Powered by AI
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="gradient-text">
              Build Your AI Resume
            </span>
            <br />
            <span className="text-white">in Seconds</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
            Generate ATS-optimized, professional resumes instantly using
            cutting-edge AI. Stand out from the crowd.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="h-5 w-5" />
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Link>
            <Link href="/login">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-gray-300 font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                Login
              </motion.span>
            </Link>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 grid grid-cols-4 gap-6 sm:gap-12 px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Everything you need
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              From generation to download, we&apos;ve got you covered.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg ${f.glow} group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              How it works
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Three simple steps to your perfect resume.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {[
              { num: "01", title: "Choose a Template", desc: "Browse 20+ professionally designed templates and pick the one that matches your style." },
              { num: "02", title: "Fill in Your Details", desc: "Enter your experience, education, skills, and projects. Our smart form guides you through." },
              { num: "03", title: "Generate & Download", desc: "AI crafts your resume in seconds. Review it and download as a polished PDF." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex gap-6 items-start rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all"
              >
                <span className="text-4xl font-black gradient-text shrink-0">{step.num}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-12 sm:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-pink-600/5 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to build your resume?
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-lg mx-auto">
              Join and create a standout resume in minutes, not hours.
            </p>
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="h-5 w-5" />
                Start Building — It&apos;s Free
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
