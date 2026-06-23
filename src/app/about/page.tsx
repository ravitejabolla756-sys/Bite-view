import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | BiteView',
  description: 'Building the future of restaurant menus using AI and augmented reality.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">About Us</h1>
      
      <div className="prose prose-invert prose-lg mx-auto">
        <p className="text-xl text-muted leading-relaxed mb-8">
          BiteView is building the future of restaurant menus using AI and augmented reality.
        </p>
        <p className="text-xl text-muted leading-relaxed">
          Our mission is to help restaurants increase customer engagement and improve dining experiences by turning ordinary dish photos into interactive 3D visualizations.
        </p>
      </div>
    </div>
  );
}
