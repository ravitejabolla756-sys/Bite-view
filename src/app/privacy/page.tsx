import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BiteView',
  description: 'Privacy Policy for BiteView',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted mb-12">Effective Date: June 2026</p>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-muted space-y-2">
            <li>Google account information</li>
            <li>Restaurant details</li>
            <li>Uploaded food images</li>
            <li>Analytics data</li>
            <li>Device information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How We Use Information</h2>
          <ul className="list-disc list-inside text-muted space-y-2">
            <li>To provide AR menu services</li>
            <li>To improve BiteView</li>
            <li>To communicate updates</li>
            <li>To process subscriptions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Third Party Services</h2>
          <ul className="list-disc list-inside text-muted space-y-2">
            <li>Google Authentication</li>
            <li>Supabase</li>
            <li>Google Play Billing</li>
            <li>Tripo AI</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
          <p className="text-muted leading-relaxed">
            We retain uploaded images and restaurant information until users delete their accounts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Children</h2>
          <p className="text-muted leading-relaxed">
            BiteView is not intended for users under 13 years old.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="text-muted leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@biteview.ai" className="text-primary hover:underline">support@biteview.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
