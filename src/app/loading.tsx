export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="text-center space-y-6">
        {/* Animated Logo/Spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-accent-500 animate-spin animation-delay-150" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold text-white">
            Loading...
          </h2>
          <p className="text-dark-400">
            Preparing your experience
          </p>
        </div>

        {/* Pulse dots */}
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse animation-delay-200" />
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse animation-delay-400" />
        </div>
      </div>
    </div>
  )
}
