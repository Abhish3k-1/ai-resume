"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, FileText, Download, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Generation",
    desc: "Leverage cutting-edge AI to craft professional resumes tailored to your target role in seconds.",
  },
  {
    icon: FileText,
    title: "ATS Optimized Resume",
    desc: "Every resume is optimized for Applicant Tracking Systems so your application gets through.",
  },
  {
    icon: Download,
    title: "Instant PDF Download",
    desc: "Download your polished resume as a print-ready PDF with a single click.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-36 pb-24 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-200/40 blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-3xl" />
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
            className="mb-6 flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm"
          >
            <Zap className="h-4 w-4" />
            Powered by AI
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Build Your AI Resume
            </span>
            <br />
            <span className="text-gray-900">in Seconds</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed">
            Generate ATS-optimized, professional resumes instantly using
            cutting-edge AI. Stand out from the crowd.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="h-5 w-5" />
                Get Started
              </motion.span>
            </Link>
            <Link href="/login">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 font-semibold text-lg hover:bg-white transition-all cursor-pointer"
              >
                Login
              </motion.span>
            </Link>
          </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything you need
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              From generation to download, we&apos;ve got you covered.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-shadow">
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
