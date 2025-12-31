import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-[200px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 leading-none">
            404
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 blur-3xl" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-xl text-dark-300 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button variant="primary" size="lg" leftIcon={<Home />}>
              Go Home
            </Button>
          </Link>
          <Link href="/#programs">
            <Button variant="outline" size="lg" leftIcon={<Search />}>
              Explore Programs
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-dark-700">
          <p className="text-sm text-dark-500 mb-4">Quick Links</p>
          <div className="flex gap-4 justify-center flex-wrap text-sm">
            <Link href="/#about" className="text-primary-400 hover:text-primary-300 transition-colors">
              About Us
            </Link>
            <Link href="/#programs" className="text-primary-400 hover:text-primary-300 transition-colors">
              Programs
            </Link>
            <Link href="/#team" className="text-primary-400 hover:text-primary-300 transition-colors">
              Team
            </Link>
            <Link href="/#blog" className="text-primary-400 hover:text-primary-300 transition-colors">
              Blog
            </Link>
            <Link href="/get-involved" className="text-primary-400 hover:text-primary-300 transition-colors">
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
