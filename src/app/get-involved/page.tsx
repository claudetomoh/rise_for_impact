'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import Link from 'next/link';

type FormTrack = 'program' | 'volunteer' | 'team' | null;

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  motivation: string;
  experience: string;
  message: string; // added
}

interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  role: string;
  experience: string;
  skills: string;
  availability: string;
  portfolio: string;
  linkedin: string;
  whyVolunteer: string;
  whatCanOffer: string;
  previousWork: string;
  heardFrom: string;
  additionalInfo: string;
}

export default function GetInvolvedPage() {
  const [selectedTrack, setSelectedTrack] = useState<FormTrack>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    region: '',
    motivation: '',
    experience: '',
    message: '', // added
  });
  const [volunteerFormData, setVolunteerFormData] = useState<VolunteerFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    role: '',
    experience: '',
    skills: '',
    availability: '',
    portfolio: '',
    linkedin: '',
    whyVolunteer: '',
    whatCanOffer: '',
    previousWork: '',
    heardFrom: '',
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const tracks = [
    {
      id: 'program' as FormTrack,
      icon: GraduationCap,
      title: 'Apply for program',
      subtitle: 'SCHOLARSHIPS & FELLOWSHIPS',
      description: 'Scholarships, fellowships, and residencies.',
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'volunteer' as FormTrack,
      icon: Users,
      title: 'Volunteer or mentor',
      subtitle: 'VOLUNTEER & MENTORS',
      description: 'Support our cohorts & community labs.',
      color: 'from-accent-500 to-accent-600',
    },
    {
      id: 'team' as FormTrack,
      icon: Briefcase,
      title: 'Join the Rise team',
      subtitle: 'RISE STAFF OPENINGS',
      description: 'Bring your operations or growth expertise.',
      color: 'from-secondary-500 to-secondary-600',
    },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // First, subscribe to newsletter
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, source: 'application_form' }),
      })
      // Continue with application submission
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Application submitted successfully! You\'ve also been subscribed to our newsletter.')
        // Reset form with correct field names
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          region: '',
          motivation: '',
          experience: '',
          message: '', // added
        })
      } else {
        setSubmitMessage(data.error || 'Failed to submit application')
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleVolunteerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setVolunteerFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover"
          style={{ 
            backgroundImage: `url(/images/backgrounds/Togetherness.jpg)`,
            backgroundPosition: 'center 60%',
          }}
        />
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-green-950/60 to-teal-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.08),transparent_50%)]" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6 shadow-xl shadow-emerald-500/20"
              >
                <span className="text-sm font-bold text-emerald-300 uppercase tracking-widest">APPLY · VOLUNTEER · JOIN</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 leading-tight">
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">The Rise gateway is always open </span>
                <span className="text-gradient drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">for changemakers.</span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-50/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Pick a track below and tell us why you want to build with Rise for Impact.
              </p>
            </motion.div>

            {!selectedTrack ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tracks.map((track, index) => (
                  <motion.button
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className="group p-6 rounded-3xl border border-dark-700 bg-dark-900/60 hover:border-primary-500/40 hover:bg-dark-800/80 transition-all duration-300 text-left shadow-lg relative overflow-hidden"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <track.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <p className="text-primary-400 text-xs uppercase tracking-wider font-semibold mb-2">
                        {track.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                        {track.title}
                      </h3>

                      <p className="text-dark-300 mb-6 leading-relaxed">{track.description}</p>

                      <div className="flex items-center text-primary-400 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                        Get started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : submitted ? (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="max-w-2xl mx-auto glass-card p-12 text-center border border-green-500/20 relative overflow-hidden"
            >
              {/* Success Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">Thank you for your interest!</h2>
                <p className="text-dark-200 text-lg mb-2">
                  We've received your application for{' '}
                  <span className="text-primary-400 font-semibold">
                    {tracks.find(t => t.id === selectedTrack)?.title}
                  </span>
                </p>
                <p className="text-dark-300 mb-8">
                  Our team will review your submission and contact you at{' '}
                  <span className="text-accent-400 font-semibold">
                    {selectedTrack === 'volunteer' ? volunteerFormData.email : formData.email}
                  </span> within 5-7 business days.
                </p>
                <p className="text-sm text-dark-400">Redirecting to homepage...</p>
              </div>
            </motion.div>
          ) : (
            /* Application Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => setSelectedTrack(null)}
                className="text-dark-300 hover:text-white mb-8 flex items-center gap-2 transition-all duration-300 group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to tracks
              </motion.button>

              <div className="glass-card p-8 md:p-12 border border-dark-700/50">
                {/* Track Header */}
                <div className="flex items-start gap-4 mb-8">
                  {(() => {
                    const track = tracks.find(t => t.id === selectedTrack);
                    if (!track) return null;
                    return (
                      <>
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center flex-shrink-0`}>
                          <track.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-primary-400 text-xs uppercase tracking-wider font-semibold mb-1">
                            {track.subtitle}
                          </p>
                          <h2 className="text-3xl font-bold text-white mb-2">{track.title}</h2>
                          <p className="text-gray-400">{track.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {selectedTrack === 'volunteer' ? (
                    /* Volunteer Application Form */
                    <>
                      {/* Basic Information */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-dark-700 pb-2">Basic Information</h3>
                        
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-dark-200 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={volunteerFormData.fullName}
                            onChange={handleVolunteerInputChange}
                            placeholder="First + last name"
                            required
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={volunteerFormData.email}
                              onChange={handleVolunteerInputChange}
                              placeholder="you@example.com"
                              required
                              className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-dark-200 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={volunteerFormData.phone}
                              onChange={handleVolunteerInputChange}
                              placeholder="+1 (555) 123-4567"
                              className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-dark-200 mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={volunteerFormData.country}
                              onChange={handleVolunteerInputChange}
                              placeholder="Your country"
                              required
                              className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                            />
                          </div>

                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-dark-200 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={volunteerFormData.city}
                              onChange={handleVolunteerInputChange}
                              placeholder="Your city"
                              className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Role & Experience */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-dark-700 pb-2">Role & Experience</h3>
                        
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-dark-200 mb-2">
                            What role are you interested in? <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="role"
                            name="role"
                            value={volunteerFormData.role}
                            onChange={handleVolunteerInputChange}
                            required
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          >
                            <option value="">Select a role</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Content Writer">Content Writer</option>
                            <option value="Social Media Manager">Social Media Manager</option>
                            <option value="Video Editor">Video Editor</option>
                            <option value="Web Developer">Web Developer</option>
                            <option value="Event Coordinator">Event Coordinator</option>
                            <option value="Photographer">Photographer</option>
                            <option value="Marketing Specialist">Marketing Specialist</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-dark-200 mb-2">
                            Years of experience or level <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="experience"
                            name="experience"
                            value={volunteerFormData.experience}
                            onChange={handleVolunteerInputChange}
                            placeholder="e.g., 2 years or Intermediate"
                            required
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          />
                        </div>

                        <div>
                          <label htmlFor="skills" className="block text-sm font-medium text-dark-200 mb-2">
                            Relevant Skills <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="skills"
                            name="skills"
                            value={volunteerFormData.skills}
                            onChange={handleVolunteerInputChange}
                            placeholder="List your relevant skills (e.g., Adobe Photoshop, Illustrator, Canva, Typography, etc.)"
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="availability" className="block text-sm font-medium text-dark-200 mb-2">
                            Weekly Availability <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="availability"
                            name="availability"
                            value={volunteerFormData.availability}
                            onChange={handleVolunteerInputChange}
                            placeholder="e.g., 5-10 hours per week"
                            required
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Portfolio & Links */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-dark-700 pb-2">Portfolio & Links</h3>
                        
                        <div>
                          <label htmlFor="portfolio" className="block text-sm font-medium text-dark-200 mb-2">
                            Portfolio / Work Samples URL
                          </label>
                          <input
                            type="url"
                            id="portfolio"
                            name="portfolio"
                            value={volunteerFormData.portfolio}
                            onChange={handleVolunteerInputChange}
                            placeholder="https://yourportfolio.com or Behance/Dribbble link"
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          />
                        </div>

                        <div>
                          <label htmlFor="linkedin" className="block text-sm font-medium text-dark-200 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={volunteerFormData.linkedin}
                            onChange={handleVolunteerInputChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Motivation & Background */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-dark-700 pb-2">Motivation & Background</h3>
                        
                        <div>
                          <label htmlFor="whyVolunteer" className="block text-sm font-medium text-dark-200 mb-2">
                            Why do you want to volunteer with Rise for Impact? <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="whyVolunteer"
                            name="whyVolunteer"
                            value={volunteerFormData.whyVolunteer}
                            onChange={handleVolunteerInputChange}
                            placeholder="Share your motivation and what draws you to our mission..."
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="whatCanOffer" className="block text-sm font-medium text-dark-200 mb-2">
                            What can you offer to our team? <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="whatCanOffer"
                            name="whatCanOffer"
                            value={volunteerFormData.whatCanOffer}
                            onChange={handleVolunteerInputChange}
                            placeholder="Describe your unique skills, perspectives, or contributions..."
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="previousWork" className="block text-sm font-medium text-dark-200 mb-2">
                            Previous volunteer or relevant work experience
                          </label>
                          <textarea
                            id="previousWork"
                            name="previousWork"
                            value={volunteerFormData.previousWork}
                            onChange={handleVolunteerInputChange}
                            placeholder="Tell us about your previous experience (if any)..."
                            rows={4}
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                          />
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-dark-700 pb-2">Additional Information</h3>
                        
                        <div>
                          <label htmlFor="heardFrom" className="block text-sm font-medium text-dark-200 mb-2">
                            How did you hear about us?
                          </label>
                          <input
                            type="text"
                            id="heardFrom"
                            name="heardFrom"
                            value={volunteerFormData.heardFrom}
                            onChange={handleVolunteerInputChange}
                            placeholder="e.g., Social Media, Friend, Website, etc."
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                          />
                        </div>

                        <div>
                          <label htmlFor="additionalInfo" className="block text-sm font-medium text-dark-200 mb-2">
                            Anything else you'd like us to know?
                          </label>
                          <textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            value={volunteerFormData.additionalInfo}
                            onChange={handleVolunteerInputChange}
                            placeholder="Optional additional information..."
                            rows={3}
                            className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                          />
                        </div>
                      </div>
                    </>    
                  ) : (
                    /* General Application Form */
                    <>
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-dark-200 mb-2">
                          Full name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="First + last"
                          required
                          className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-dark-200 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Where are you based?"
                          required
                          className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">
                          Why you want to join
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Share your story"
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                        />
                      </div>
                    </>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Submit Application
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>

                  {submitMessage && (
                    <p className="text-center text-sm text-white mt-4">
                      {submitMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
