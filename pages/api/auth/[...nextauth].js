import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});


const sendWelcomeEmail = async ({ user }) => {
    const { email } = user;
  
    try {
      const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
        encoding: 'utf8',
      });
      const emailTemplate = Handlebars.compile(emailFile);
      await transporter.sendMail({
        from: `"✨ 民宿" ${process.env.EMAIL_FROM}`,
        to: email,
        subject: "欢迎登录! 🎉",
        html: emailTemplate({
          base_url: process.env.NEXTAUTH_URL,
          support_email: "2603682659@qq.com",
        }),
      });
    } catch (error) {
      console.log(`❌ 无法向用户发送欢迎电子邮件 (${email})`);
    }
  };


const emailsDir = path.resolve(process.cwd(), "emails");

const sendVerificationRequest = ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
    encoding: "utf8",
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"✨民宿" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: "登录链接",
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

export default NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        httpOptions: {
            timeout: 40000,
          },
    }),
    EmailProvider({
        maxAge: 10 * 60,
        sendVerificationRequest,
    }),
  ],
  events:{ createUser: sendWelcomeEmail},
  adapter: PrismaAdapter(prisma),
});
