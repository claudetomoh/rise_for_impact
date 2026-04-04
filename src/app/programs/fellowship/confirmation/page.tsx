import Link from 'next/link'
import { CheckCircle2, ArrowLeft, Mail } from 'lucide-react'

export const metadata = {
  title: 'Application Submitted | Rise for Impact Fellowship',
  description: 'Your fellowship application has been received.',
}

export default function FellowshipConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Application Submitted
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Thank you for applying to the Rise for Impact Fellowship.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          Applications will be carefully reviewed, and shortlisted candidates will be contacted for the next stage.
        </p>

        {/* Info box */}
        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-5 mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Check your email</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A confirmation has been sent to the email address you provided. Please check your inbox, including your spam folder.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">What happens next</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Only shortlisted candidates will be contacted. We appreciate your patience and your interest in the fellowship.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/programs/fellowship"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Fellowship Page
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 dark:border-dark-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
