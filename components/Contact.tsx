'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { openMailto } from '@/lib/openMailto'
import { FadeIn } from './motion/FadeIn'
import { prefersReducedMotion } from '@/lib/motionTokens'

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const CONTACT_EMAIL = 'subhranshurout95@gmail.com'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    budget: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'mailto'>('idle')

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          location: formData.location.trim(),
          budget: formData.budget.trim(),
          honeypot: formData.honeypot,
        }),
      })

      const data = await response.json()

      if (response.ok && data.sent) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', location: '', budget: '', subject: '', message: '', honeypot: '' })
        return
      }

      if (data.mailtoUrl) {
        setSubmitStatus('mailto')
        openMailto(data.mailtoUrl)
        return
      }

      setSubmitStatus('error')
    } catch {
      const subject = encodeURIComponent(`[Portfolio] ${formData.subject.trim()}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )
      setSubmitStatus('mailto')
      openMailto(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="spacing-section contact-section gradient-bg-section">
      <div className="container mx-auto max-w-5xl">
        <div className="contact-layout">
          <FadeIn className="contact-info">
            <div className="contact-intro">
              <SectionHeader
                label="Contact"
                title="Let's discuss your project"
                description="Send a message — it goes directly to my inbox. I typically respond within 1–2 business days."
              />
            </div>

            <dl className="contact-details">
              <div className="contact-detail">
                <dt className="contact-detail__label">Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="contact-detail__value contact-detail__link">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="contact-detail">
                <dt className="contact-detail__label">Location</dt>
                <dd className="contact-detail__value">Ahmedabad, India</dd>
              </div>
              <div className="contact-detail">
                <dt className="contact-detail__label">Phone</dt>
                <dd>
                  <a href="tel:+917077955230" className="contact-detail__value contact-detail__link">
                    +91 7077955230
                  </a>
                </dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn delay={0.12} y={20}>
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="contact-form__error">{errors.name}</p>}
              </div>
              <div className="contact-form__field">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="contact-form__error">{errors.email}</p>}
              </div>
            </div>

            <div className="contact-form__field">
              <input
                type="text"
                placeholder="Location (optional)"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <input
                  type="text"
                  placeholder="Budget (optional)"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="contact-form__field">
                <input
                  type="text"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && <p className="contact-form__error">{errors.subject}</p>}
              </div>
            </div>

            <div className="contact-form__field">
              <textarea
                placeholder="Message *"
                rows={6}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="input-field input-field--textarea resize-none"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="contact-form__error">{errors.message}</p>}
            </div>

            {submitStatus === 'success' && (
              <p className="contact-form__notice contact-form__notice--success">
                Message sent. Thank you — I&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === 'mailto' && (
              <p className="contact-form__notice">
                Your email app should open with a pre-filled message to {CONTACT_EMAIL}.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="contact-form__notice contact-form__notice--error">
                Could not send. Please email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>{' '}
                directly.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="contact-form__submit btn-primary rounded-full"
              whileHover={prefersReducedMotion() ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </motion.button>
          </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
