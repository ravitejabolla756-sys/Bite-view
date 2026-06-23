import { Check } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | BiteView',
  description: 'Simple, transparent pricing for restaurants of all sizes.',
};

const tiers = [
  {
    name: 'FREE',
    price: '₹0',
    interval: '/month',
    desc: 'Perfect for trying out AR menus.',
    features: ['2 dishes', 'Basic analytics', 'QR codes'],
    buttonText: 'Start Free',
    buttonHref: '/contact',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '₹399',
    interval: '/month',
    desc: 'Everything you need to scale your AR dining experience.',
    features: ['Unlimited dishes', 'Unlimited QR cards', 'HD models', 'Priority processing', 'Advanced analytics'],
    buttonText: 'Upgrade to Pro',
    buttonHref: '/contact',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    interval: '',
    desc: 'Tailored solutions for restaurant chains.',
    features: ['Dedicated support', 'Custom branding', 'API access'],
    buttonText: 'Contact Sales',
    buttonHref: '/contact',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">Choose the plan that fits your restaurant&apos;s needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 border ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-primary/10 to-transparent border-primary shadow-2xl shadow-primary/20 scale-100 md:scale-105 relative z-10'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted mb-6 h-10">{tier.desc}</p>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-bold">{tier.price}</span>
                <span className="text-muted font-medium">{tier.interval}</span>
              </div>

              <Link
                href={tier.buttonHref}
                className={`w-full block text-center py-3 rounded-xl font-bold transition-colors mb-8 ${
                  tier.highlighted
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tier.buttonText}
              </Link>

              <div className="space-y-4">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
