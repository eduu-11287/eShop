import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not configured');
    return res.status(500).json({ 
      success: false, 
      error: 'Email service not configured' 
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Sanitize inputs
    const sanitize = (str) => String(str).replace(/[<>]/g, '').trim();
    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedMessage = sanitize(message);

    console.log(`📧 Sending email from: ${sanitizedName}`);

    // Send email via Resend
    const data = await resend.emails.send({
      from: 'eShop Contact <onboarding@resend.dev>',
      to: 'bumble.11287@gmail.com',
      subject: `📩 New Message from ${sanitizedName}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; color: #222; max-width: 600px;">
          <h2 style="color: #E63946; border-bottom: 2px solid #E63946; padding-bottom: 10px;">
            New Contact Message
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <div style="background:#f8f9fa; padding:16px; border-left:4px solid #E63946;">
              <p style="margin: 0; white-space: pre-wrap;">${sanitizedMessage}</p>
            </div>
          </div>
          <hr />
          <p style="font-size: 0.85rem; color: #888; text-align: center;">
            📨 Sent via eShop Contact Form
          </p>
        </div>
      `,
      replyTo: sanitizedEmail,
    });

    console.log('✅ Email sent successfully:', data.id);

    return res.status(200).json({ 
      success: true, 
      messageId: data.id 
    });

  } catch (err) {
    console.error('❌ Email send failed:', err);
    
    return res.status(500).json({ 
      success: false, 
      error: err.message || 'Failed to send email' 
    });
  }
}