/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from '@/lib';
import UserModel from '@/model/user';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_API_EMAIL_KEY);

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { email } = await request.json();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email, 
            subject: 'Hello from Resend!',
            html: `This is your link to reset your password: ${process.env.NEXT_PUBLIC_CLIENT_URL}reset-pass?email=${email}`
        });
        return NextResponse.json({ message: 'Email sent successfully!'}, { status: 200 })
    } catch (error: any) {
        console.error("Error sending email:", error);
    
        const errorMessage = error.response?.data?.message || 'Error sending email';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
    
}
