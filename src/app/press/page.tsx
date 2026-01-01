export default function PressPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 py-20">
      <div className="container max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Press Kit
          </h1>
          <p className="text-dark-300 text-base max-w-2xl mx-auto">
            Media resources and brand assets
          </p>
        </div>
        <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Media Inquiries</h2>
            <p className="text-dark-200 text-base mb-2">
              For press inquiries, interviews, or media partnerships, contact:
            </p>
            <a href="mailto:info@riseforimpact.org" className="text-primary-400 hover:underline text-base">
              info@riseforimpact.org
            </a>
          </div>
          <div className="pt-4 border-t border-dark-700">
            <p className="text-dark-300 text-sm italic">
              Brand guidelines and downloadable assets coming soon
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
