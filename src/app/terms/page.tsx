import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | BiteView',
  description: 'Terms of Service for BiteView',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Terms of Service</h1>
      
      <div className="space-y-8 text-muted leading-relaxed text-lg">
        <p>
          By using BiteView, you agree to these Terms of Service. Please read them carefully.
        </p>
        
        <ul className="list-disc list-inside space-y-4">
          <li><strong>Ownership:</strong> Users retain ownership of all uploaded images and content.</li>
          <li><strong>Copyright:</strong> Users may not upload copyrighted content without explicit permission from the copyright holder.</li>
          <li><strong>Billing:</strong> Subscriptions renew automatically until cancelled.</li>
          <li><strong>Termination:</strong> Violation of these terms may result in immediate account suspension or termination.</li>
        </ul>
        
        <p className="pt-8">
          For questions about these terms, please contact us at <a href="mailto:support@biteview.ai" className="text-primary hover:underline">support@biteview.ai</a>.
        </p>
      </div>
    </div>
  );
}
