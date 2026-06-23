'use client';

import { motion } from 'framer-motion';
import { Mail, Store, Image as ImageIcon, Box, ScanLine, Receipt, Clock, CheckCircle } from 'lucide-react';

const deletionEffects = [
  { text: 'Google account access will be removed', icon: Mail },
  { text: 'Restaurant profile information will be deleted', icon: Store },
  { text: 'Uploaded food photos will be permanently deleted', icon: ImageIcon },
  { text: 'Generated 3D/AR models will be deleted', icon: Box },
  { text: 'QR codes associated with the account will be deleted', icon: ScanLine },
  { text: 'Subscription history and payment records may be retained for legal and accounting requirements', icon: Receipt },
];

const requestSteps = [
  { step: 1, title: 'Send an email to:', content: 'support@biteview.app' },
  { step: 2, title: 'Use subject:', content: 'Delete My BiteView Account' },
  { step: 3, title: 'Include:', content: 'Registered Google email address & Restaurant name (if applicable)' },
  { step: 4, title: 'Our team will verify:', content: 'Ownership will be verified and the request processed.' },
];

const faqs = [
  {
    q: 'Can I recover my account after deletion?',
    a: 'No. Account deletion is permanent.',
  },
  {
    q: 'Will my subscription be refunded?',
    a: 'Active subscriptions are governed by our Refund Policy.',
  },
  {
    q: 'Can I delete only photos without deleting my account?',
    a: 'Not currently. Partial deletion controls may be added in future updates.',
  },
];

export default function DeleteAccountPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="pt-24 pb-32 px-6 max-w-5xl mx-auto text-black">
        {/* ── Hero Section ────────────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Delete Your BiteView Account
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Request permanent removal of your BiteView account, restaurant profile, uploaded images, and generated AR content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* ── What Happens Card ─────────────────────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 border border-gray-200 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">What happens when you request deletion?</h2>
            <div className="space-y-4">
              {deletionEffects.map((effect, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 text-gray-500">
                    <effect.icon size={20} />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 font-medium">{effect.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── How to Request Card ───────────────────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 border border-gray-200 p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">How to request account deletion</h2>
              <div className="space-y-6">
                {requestSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Processing Timeline ─────────────────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Deletion Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <Clock size={32} className="mx-auto text-primary mb-4" />
              <p className="font-bold mb-2">Verification Period</p>
              <p className="text-gray-600 text-sm">Up to 48 hours</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <Box size={32} className="mx-auto text-primary mb-4" />
              <p className="font-bold mb-2">Data Deletion Completion</p>
              <p className="text-gray-600 text-sm">Within 7 days</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <CheckCircle size={32} className="mx-auto text-primary mb-4" />
              <p className="font-bold mb-2">Confirmation</p>
              <p className="text-gray-600 text-sm">Email sent after successful deletion</p>
            </div>
          </div>
        </motion.div>

        {/* ── FAQ ─────────────────────────────────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ─────────────────────────────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need help?</h2>
          <p className="text-gray-600 mb-6">If you have any questions, feel free to reach out to our support team.</p>
          <a 
            href="mailto:support@biteview.app" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            <Mail size={20} />
            Contact support@biteview.app
          </a>
        </div>
      </div>
    </div>
  );
}
