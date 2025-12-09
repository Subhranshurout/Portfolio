'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getTransition, prefersReducedMotion } from '@/lib/motionTokens'

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitAttempts, setSubmitAttempts] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.honeypot) {
      return // Silent fail for bots
    }

    // Rate limiting
    if (submitAttempts >= 5) {
      setSubmitStatus('error')
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitAttempts((prev) => prev + 1)

    try {
      // In production, replace with actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' })
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    {
      href: 'mailto:subhranshurout95@gmail.com',
      label: 'Email',
      icon: '📧',
      color: 'bg-red-500',
      ariaLabel: 'Send email to subhranshurout95@gmail.com',
    },
    {
      href: 'tel:7077955230',
      label: 'Phone',
      icon: '📱',
      color: 'bg-green-500',
      ariaLabel: 'Call 7077955230',
    },
    {
      href: 'https://linkedin.com/in/subhranshu-rout-a32601239',
      label: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-600',
      ariaLabel: 'Visit LinkedIn profile',
    },
    {
      href: 'https://github.com/Subhranshurout',
      label: 'GitHub',
      icon: '💻',
      color: 'bg-gray-800',
      ariaLabel: 'Visit GitHub profile',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="container mx-auto px-4 py-20 spacing-section"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={getTransition('medium')}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 gradient-text text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={getTransition('medium')}
        >
          🔗 Connect With Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Links */}
          <motion.div
            className="card p-6 sm:p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={getTransition('medium')}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-text-primary">
              Get in Touch
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.ariaLabel}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 ${link.color} text-white rounded-lg font-medium transition-transform min-h-[44px] touch-manipulation`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={getTransition('medium')}
                  whileHover={prefersReducedMotion() ? {} : { scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl sm:text-2xl" aria-hidden="true">{link.icon}</span>
                  <span className="text-sm sm:text-base">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="card p-6 sm:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={getTransition('medium')}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-text-primary">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData({ ...formData, honeypot: e.target.value })
                }
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-text-primary"
                  >
                    Name <span className="text-error" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    className={`w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] touch-manipulation ${
                      errors.name ? 'ring-2 ring-error' : ''
                    }`}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-text-primary"
                  >
                    Email <span className="text-error" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                    className={`w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] touch-manipulation ${
                      errors.email ? 'ring-2 ring-error' : ''
                    }`}
                    placeholder="your.email@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2 text-text-primary"
                  >
                    Subject <span className="text-error" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value })
                      if (errors.subject) setErrors({ ...errors, subject: undefined })
                    }}
                    className={`w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] touch-manipulation ${
                      errors.subject ? 'ring-2 ring-error' : ''
                    }`}
                    placeholder="What's this about?"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-error" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-text-primary"
                  >
                    Message <span className="text-error" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: undefined })
                    }}
                    className={`w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent resize-none min-h-[120px] touch-manipulation ${
                      errors.message ? 'ring-2 ring-error' : ''
                    }`}
                    placeholder="Your message..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-text-secondary">
                    {formData.message.length}/2000 characters
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitAttempts >= 5}
                  className="w-full px-6 py-3 gradient-primary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
                  whileHover={!isSubmitting && !prefersReducedMotion() ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                  transition={getTransition('fast')}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </span>
                  ) : submitStatus === 'success' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span aria-hidden="true">✓</span>
                      <span>Message Sent!</span>
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {submitStatus === 'error' && (
                  <p className="text-error text-sm text-center" role="alert">
                    {submitAttempts >= 5
                      ? 'Too many attempts. Please try again later.'
                      : 'Something went wrong. Please try again.'}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
