import { NextRequest, NextResponse } from 'next/server'
import { buildMailtoUrl, sendContactEmail } from '@/lib/email'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now()
      for (const [ip, limit] of rateLimitMap.entries()) {
        if (now > limit.resetTime) rateLimitMap.delete(ip)
      }
    },
    60 * 60 * 1000
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 })
    return true
  }

  if (limit.count >= 5) return false
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    let body: Record<string, string>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { name, email, subject, message, location, budget, honeypot } = body

    if (honeypot) {
      return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
    }

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const payload = {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 100),
      subject: subject.trim().substring(0, 200),
      message: message.trim().substring(0, 2000),
      location: location?.trim().substring(0, 100),
      budget: budget?.trim().substring(0, 100),
    }

    const result = await sendContactEmail(payload)

    if (result.ok) {
      return NextResponse.json({ message: 'Message sent successfully', sent: true })
    }

    if (result.reason === 'not_configured') {
      return NextResponse.json({
        message: 'Email service not configured on server',
        sent: false,
        mailtoUrl: buildMailtoUrl(payload),
      })
    }

    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again or email directly.',
        mailtoUrl: buildMailtoUrl(payload),
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
