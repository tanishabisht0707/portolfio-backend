import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email notification to portfolio owner
export const sendNotificationEmail = async (contact) => {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: contact.email,
    subject: `New Portfolio Message: ${contact.subject}`,

    text: `
You have received a new message from your portfolio.

Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}

Message:
${contact.message}
    `,
  });
};

// Confirmation email to the visitor
export const sendConfirmationEmail = async (contact) => {
  await transporter.sendMail({
    from: `"Tanisha Bisht" <${process.env.EMAIL_USER}>`,
    to: contact.email,
    subject: "Thank you for contacting me!",

    text: `
Hi ${contact.name},

Thank you for reaching out through my portfolio.

I have received your message and will get back to you as soon as possible.

Best regards,
Tanisha Bisht
    `,
  });
};
