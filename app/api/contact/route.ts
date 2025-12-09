import { NextRequest, NextResponse } from 'next/server'

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Cleanup old entries periodically to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, limit] of rateLimitMap.entries()) {
      if (now > limit.resetTime) {
        rateLimitMap.delete(ip)
      }
    }
  }, 60 * 60 * 1000) // Clean up every hour
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }) // 1 hour
    return true
  }

  if (limit.count >= 5) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse JSON body with error handling
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { name, email, subject, message, honeypot } = body

    // Honeypot check (silent fail for bots)
    if (honeypot) {
      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      )
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Sanitize inputs (basic)
    const sanitized = {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 100),
      subject: subject.trim().substring(0, 200),
      message: message.trim().substring(0, 2000),
    }

    // In production, send email using SendGrid, Resend, or similar
    // For now, just log (replace with actual email service)
    console.log('Contact form submission:', sanitized)

    // TODO: Integrate with email service
    // await sendEmail({
    //   to: 'subhranshurout95@gmail.com',
    //   from: 'noreply@yourdomain.com',
    //   subject: `Portfolio Contact: ${sanitized.subject}`,
    //   text: `From: ${sanitized.name} (${sanitized.email})\n\n${sanitized.message}`,
    // })

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

