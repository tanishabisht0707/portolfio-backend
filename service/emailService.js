
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNotificationEmail = async (contact) => {
  const { name, email, subject, message } = contact;

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "tanishabisht007@gmail.com",
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <h2>You received a new portfolio message</h2>

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
