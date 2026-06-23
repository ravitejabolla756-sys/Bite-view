import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | BiteView',
  description: 'Get in touch with the BiteView team.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">Email</h2>
          <p className="text-muted mb-4">For support, pricing, or general inquiries:</p>
          <a href="mailto:support@biteview.ai" className="text-primary font-medium hover:underline text-lg">
            support@biteview.ai
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">Business Address</h2>
          <p className="text-muted mb-2">BiteView Headquarters</p>
          <p className="text-lg font-medium">Andhra Pradesh<br/>India</p>
        </div>
      </div>
    </div>
  );
}
