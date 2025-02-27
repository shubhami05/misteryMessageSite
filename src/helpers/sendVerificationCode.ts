import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from 'nodemailer';
import { renderToString } from 'react-dom/server';


export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Mystery Message | Verification code',
            html: renderToString(VerificationEmail({ username, verifyCode }))
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Verification email sent successfully" };

    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: 'Failed to send verification email' };
    }
}

