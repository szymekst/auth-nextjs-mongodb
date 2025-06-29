import nodemailer from "nodemailer";
import { render } from "@react-email/components";

type sendEmailProps = {
    to: string;
    subject: string;
    emailToHtml: React.ReactElement;
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async ({
    to,
    subject,
    emailToHtml,
}: sendEmailProps) => {
    const html = await render(emailToHtml);
    return transporter.sendMail({
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.YOUR_DOMAIN}>`,
        to,
        subject,
        html,
    });
};
