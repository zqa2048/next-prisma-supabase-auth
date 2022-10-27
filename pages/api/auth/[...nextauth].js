import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import nodemailer from 'nodemailer'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
    providers:[
        EmailProvider({
            server:{
                host:process.env.EMAIL_SERVER_HOST,
                port:process.env.EMAIL_SERVER_PORT,
                auth:{
                    user:process.env.EMAIL_SERVER_USER,
                    pass:process.env.EMAIL_SERVER_PASSWORD,
                }
            },
            from:process.env.EMAIL_FROM,
            maxAge: 10 * 60
        })
    ],
    adapter:PrismaAdapter(prisma),
    pages:{
        signIn:'/',
        signOut:'/',
        error:'/',
        verifyRequest:'/',
    },
})