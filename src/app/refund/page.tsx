import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | BiteView',
  description: 'Refund Policy for BiteView',
};

export default function RefundPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Refund Policy</h1>
      
      <div className="space-y-8 text-muted leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Monthly Subscriptions</h2>
          <p>
            Monthly subscriptions are non-refundable after model generation has started due to the high computational costs of AI 3D rendering.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Annual Plans</h2>
          <p>
            Users on annual plans can request a full refund within seven (7) days of purchase, provided that no 3D models were generated during that period.
          </p>
        </section>

        <section className="pt-8">
          <p>
            To request a refund or for any billing inquiries, please contact <a href="mailto:support@biteview.ai" className="text-primary hover:underline">support@biteview.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
