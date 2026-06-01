import nodemailer from 'nodemailer'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'subhranshurout95@gmail.com'

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  location?: string
  budget?: string
}

export function buildMailtoUrl(payload: ContactPayload): string {
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.location ? `Location: ${payload.location}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    '',
    payload.message,
  ].filter(Boolean)

  const params = new URLSearchParams({
    subject: `[Portfolio] ${payload.subject}`,
    body: lines.join('\n'),
  })

  return `mailto:${TO_EMAIL}?${params.toString()}`
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<{ ok: true } | { ok: false; reason: 'not_configured' | 'send_failed'; error?: string }> {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    return { ok: false, reason: 'not_configured' }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    const htmlExtras = [
      payload.location ? `<p><strong>Location:</strong> ${payload.location}</p>` : '',
      payload.budget ? `<p><strong>Budget:</strong> ${payload.budget}</p>` : '',
    ].join('')

    await transporter.sendMail({
      from: `"Portfolio — ${payload.name}" <${user}>`,
      to: TO_EMAIL,
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.location ? `Location: ${payload.location}` : '',
        payload.budget ? `Budget: ${payload.budget}` : '',
        '',
        payload.message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
        ${htmlExtras}
        <hr />
        <p>${payload.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return { ok: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { ok: false, reason: 'send_failed', error: message }
  }
}
