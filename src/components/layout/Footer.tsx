import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <span className="font-bold text-xl tracking-tight">BiteView</span>
            </Link>
            <p className="text-muted text-sm mb-6">
              Transform Food Photos Into Interactive AR Menus. Engage customers and elevate dining experiences.
            </p>
            <a href="mailto:support@biteview.ai" className="text-sm font-medium hover:text-primary transition-colors">
              support@biteview.ai
            </a>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/#how-it-works" className="text-muted hover:text-primary text-sm transition-colors">How It Works</Link></li>
              <li><Link href="/#features" className="text-muted hover:text-primary text-sm transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-muted hover:text-primary text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="text-muted hover:text-primary text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-muted hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="text-muted hover:text-primary text-sm transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-muted hover:text-primary text-sm transition-colors">Contact</Link></li>
              <li className="text-muted text-sm leading-relaxed">
                Andhra Pradesh<br />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} BiteView. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-muted hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
