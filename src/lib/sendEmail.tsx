import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import emailTemplates from "@/utils/emailTemplates";

type sendEmailProps = {
    to: string;
    subject: string;
    userName: string;
    token: string;
    template: keyof typeof emailTemplates;
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
    userName,
    token,
    template,
}: sendEmailProps) => {
    const TemplateComponent = emailTemplates[template];
    if (!TemplateComponent) throw new Error("E-Mail template not found");
    const html = await render(
        <TemplateComponent userName={userName} token={token} />
    );
    return transporter.sendMail({
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.YOUR_DOMAIN}>`,
        to,
        subject,
        html,
    });
};
