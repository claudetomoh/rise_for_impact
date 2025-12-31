'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.',
      })
      reset()
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or email us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-dark-900 to-dark-800/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.08),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            <span className="text-white">Get in </span>
            <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Have questions? Want to collaborate? We'd love to hear from you.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Email Us</h3>
                <a href="mailto:info@riseforimpact.org" className="text-dark-300 hover:text-primary-400 transition-colors">
                  info@riseforimpact.org
                </a>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Call Us</h3>
                <div className="space-y-1">
                  <a href="tel:+233538034157" className="text-dark-300 hover:text-accent-400 transition-colors block">
                    +233 538 034 157
                  </a>
                  <a href="tel:+237673031205" className="text-dark-300 hover:text-accent-400 transition-colors block text-sm">
                    +237 673 031 205
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Visit Us</h3>
                <div className="text-dark-300 space-y-1">
                  <p>Eastern Region, Ghana</p>
                  <p className="text-sm">Yaoundé, Cameroon</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name *
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="John Doe"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone (Optional)
                  </label>
                  <Input
                    {...register('phone')}
                    placeholder="+233 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Subject *
                  </label>
                  <Input
                    {...register('subject')}
                    placeholder="How can we help?"
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className={`w-full px-4 py-3 bg-dark-800 border ${
                    errors.message ? 'border-red-500' : 'border-dark-700'
                  } rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
                rightIcon={isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
