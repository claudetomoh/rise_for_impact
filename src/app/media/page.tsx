export default function MediaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 py-20">
      <div className="container max-w-5xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Media Hub
          </h1>
          <p className="text-dark-300 text-base max-w-2xl mx-auto">
            Photos, videos, and media resources from our programs and events
          </p>
        </div>
        <div className="glass-card p-6 md:p-8 rounded-2xl text-center">
          <p className="text-dark-200 text-base mb-4">
            Our media gallery is being curated with photos and videos from Fellowship programs, Impact Clinics, and community events across Africa.
          </p>
          <p className="text-dark-300 text-sm italic">Media hub launching soon</p>
        </div>
      </div>
    </main>
  );
}
