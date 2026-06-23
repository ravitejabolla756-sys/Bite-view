'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Box, BarChart3, Smartphone, Zap, Palette, Cloud, Settings, ScanLine } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* ── Hero Section ────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Transform Food Photos <br className="hidden md:block" />
            Into Interactive <span className="text-primary">AR Menus</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto mb-12"
          >
            Turn ordinary dish photos into immersive 3D experiences customers can view in augmented reality.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/pricing" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-2">
              Start Free <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto bg-white/5 border border-white/10 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center">
              Book Demo
            </Link>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl p-2 md:p-4">
              <div className="aspect-video bg-white/5 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative">
                {/* Simulated UI elements for SaaS feel */}
                <div className="absolute top-0 left-0 w-full h-12 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-muted flex flex-col items-center gap-4">
                  <Box size={48} className="text-primary/50" />
                  <p>3D Food Preview & Restaurant Dashboard</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Statistics ──────────────────────────────────────────────────────────── */}
      <section className="px-6 border-y border-white/5 bg-white/5 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-4">
            <h3 className="text-5xl font-bold mb-2">500+</h3>
            <p className="text-muted font-medium tracking-wide uppercase text-sm">Restaurants</p>
          </div>
          <div className="py-4">
            <h3 className="text-5xl font-bold mb-2">20K+</h3>
            <p className="text-muted font-medium tracking-wide uppercase text-sm">AR Views</p>
          </div>
          <div className="py-4">
            <h3 className="text-5xl font-bold text-primary mb-2">4.9★</h3>
            <p className="text-muted font-medium tracking-wide uppercase text-sm">Customer Rating</p>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">From a simple photo to a fully interactive 3D model in four easy steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Upload 5 photos', icon: Smartphone, desc: 'Capture different angles of your dish.' },
              { step: 2, title: 'AI generates 3D model', icon: Box, desc: 'Our AI reconstructs a high-fidelity model.' },
              { step: 3, title: 'Print QR cards', icon: ScanLine, desc: 'Generate custom QR codes for tables.' },
              { step: 4, title: 'Customers view in AR', icon: Zap, desc: 'Diners scan and see the food in real space.' },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Step {item.step}</h3>
                <h4 className="text-lg font-medium text-white/90 mb-2">{item.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────────── */}
      <section id="features" className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Powerful features designed to make AR menus effortless for any restaurant.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Unlimited QR Codes', icon: ScanLine },
              { title: 'AI 3D Generation', icon: Box },
              { title: 'Analytics Dashboard', icon: BarChart3 },
              { title: 'Restaurant Branding', icon: Palette },
              { title: 'Custom Logos', icon: Settings },
              { title: 'Cloud Storage', icon: Cloud },
              { title: 'Multi Device Support', icon: Smartphone },
              { title: 'Fast Processing', icon: Zap },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-6 rounded-2xl border border-white/5 bg-background hover:border-white/10 transition-colors">
                <div className="p-3 rounded-lg bg-white/5 text-primary">
                  <feature.icon size={20} />
                </div>
                <span className="font-medium text-sm md:text-base">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to transform your menu?</h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto relative z-10">Join 500+ restaurants providing next-generation dining experiences today.</p>
          <Link href="/pricing" className="inline-block bg-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl shadow-primary/50 relative z-10">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
}
