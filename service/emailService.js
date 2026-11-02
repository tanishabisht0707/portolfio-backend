import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email notification to you
export const sendNotificationEmail = async (contact) => {
  const { name, email, subject, message } = contact;

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <h2>New Contact Form Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Confirmation email to the visitor
export const sendConfirmationEmail = async (contact) => {
  const { name, email, subject } = contact;

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: email,
    subject: "Thank you for contacting me!",
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting me through my portfolio.</p>
      <p>I have received your message regarding <strong>${subject}</strong>.</p>
      <p>I will get back to you soon.</p>
      <br />
      <p>Regards,<br />Tanisha</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};