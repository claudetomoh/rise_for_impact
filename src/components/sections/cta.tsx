'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Users, Sparkles, Mail, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { toast } from 'sonner'

const ctaOptions = [
	{
		icon: Sparkles,
		title: 'Join a Program',
		description: 'Apply to one of our leadership development programs',
		cta: 'Apply Now',
		href: '/#programs',
		color: 'from-primary-500 to-primary-600',
	},
	{
		icon: Heart,
		title: 'Become a Donor',
		description: 'Support the dreams of young African leaders',
		cta: 'Donate',
		href: 'mailto:info@riseforimpact.org?subject=Donation Inquiry',
		color: 'from-accent-500 to-accent-600',
		external: true,
	},
	{
		icon: Users,
		title: 'Partner With Us',
		description: 'Collaborate to amplify impact across Africa',
		cta: 'Partner',
		href: '/get-involved',
		color: 'from-blue-500 to-blue-600',
	},
]

export function CallToAction() {
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleNewsletterSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			toast.error('Please enter a valid email address')
			return
		}

		setIsSubmitting(true)
		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to subscribe')
			}

			toast.success('Welcome to Rise for Impact! 🎉', {
				description: 'Check your email for a confirmation message.',
			})
			setEmail('')
		} catch (error: any) {
			toast.error(error.message || 'Failed to subscribe', {
				description: 'Please try again or contact us directly.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="py-8 md:py-12 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_60%)]" />

			{/* Animated Orbs */}
			<motion.div
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
				style={{
					background:
						'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)',
				}}
			/>
			<motion.div
				animate={{
					scale: [1, 1.3, 1],
					opacity: [0.2, 0.4, 0.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 2,
				}}
				className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
				style={{
					background:
						'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)',
				}}
			/>

			<div className="container-premium relative z-10">
				{/* Main CTA */}
				<AnimatedSection className="text-center mb-12 md:mb-16 space-y-6">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20"
					>
						<Sparkles className="w-4 h-4 text-primary-400" />
						<span className="text-sm font-medium text-primary-400">
							Take Action Today
						</span>
					</motion.div>

					<h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
						<span className="text-white">Be Part of the </span>
						<br />
						<span className="text-gradient">Impact Revolution</span>
					</h2>

					<p className="text-base md:text-lg text-dark-300 max-w-3xl mx-auto leading-relaxed">
						Whether you're a young leader ready to grow, a donor wanting to make a
						difference,
						<br className="hidden sm:block" /> or an organization seeking
						meaningful partnerships, there's a place for you in our movement.
					</p>
				</AnimatedSection>

				{/* CTA Options */}
				<div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
					{ctaOptions.map((option, index) => (
						<motion.div
							key={option.title}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -8 }}
							className="glass-card p-5 md:p-6 rounded-2xl group relative overflow-hidden"
						>
							{/* Gradient Background on Hover */}
							<motion.div
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
								className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
							/>

							<div className="relative z-10 space-y-4">
								{/* Icon */}
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-glow`}
								>
									<option.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
								</motion.div>

								{/* Content */}
								<div>
									<h3 className="text-lg md:text-xl font-display font-bold text-white mb-2">
										{option.title}
									</h3>
									<p className="text-sm md:text-base text-dark-300 leading-relaxed">
										{option.description}
									</p>
								</div>

								{/* Button */}
								{option.external ? (
									<a href={option.href} className="block">
										<Button
											variant="outline"
											className="w-full group-hover:bg-white/10"
											rightIcon={<ArrowRight />}
										>
											{option.cta}
										</Button>
									</a>
								) : (
									<Link href={option.href}>
										<Button
											variant="outline"
											className="w-full group-hover:bg-white/10"
											rightIcon={<ArrowRight />}
										>
											{option.cta}
										</Button>
									</Link>
								)}
							</div>
						</motion.div>
					))}
				</div>

				{/* Newsletter Signup */}
				<section id="newsletter" className="py-20 scroll-mt-20">
					<div className="container max-w-4xl mx-auto px-4">
						<div className="glass-card rounded-3xl p-12 md:p-16 border border-emerald-500/20">
							<div className="text-center mb-12">
								<div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/20 backdrop-blur-sm mb-6">
									<Mail className="w-10 h-10 text-emerald-400" />
								</div>
								<h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
									Stay Inspired, Stay Informed
								</h2>
								<p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
									Get monthly updates on our programs, impact stories, and opportunities to join the movement for positive change.
								</p>
							</div>

							<form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
								<Input
									type="email"
									placeholder="Enter your email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="flex-1 h-14 px-6 bg-dark-800/50 border border-dark-700 text-white placeholder:text-dark-400 rounded-xl text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
								/>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50"
								>
									{isSubmitting ? 'Subscribing...' : 'Subscribe'}
								</Button>
							</form>

							<p className="text-center text-dark-400 text-sm">
								Join 5,000+ subscribers. Unsubscribe anytime. We respect your privacy.
							</p>
						</div>
					</div>
				</section>
			</div>
		</section>
	)
}
