import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/client.js';
import { transporter } from '../../utils/email.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { getVerificationTemplateEmail } from '../../utils/get_verfication_ template_email.js';



const registerUserService = async (data) => {
    const id_user = uuidv4();
    const {
        name,
        email,
        password,
        phone,
        role,
        profile_url,
    } = data;
    const finalRole = role === '' ? 'student' : role;
    const roleRegex = /^(administrator|student)$/;
    if (!finalRole.match(roleRegex)) {
        const error = new Error('Invalid role provided. Role must be either "administrator" or "student".');
        error.statusCode = 400;
        throw error;
    }
    const existingUser = await prisma.users.findFirst({
        where: {
            OR: [{ email }, { phone }]
        }
    });
    if (existingUser) {
        const confictedField = existingUser.email === email ? 'email addres' : 'phone number';
        const error = new Error(`${confictedField} already exists`)
        error.statusCode = 409;
        throw error
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verification_token = uuidv4();
    const email_verified = false;
    const verification_token_expires = new Date(Date.now() + 60 * 60 * 1000);

    const newUser = await prisma.users.create({
        data: {
            id_user,
            name,
            email,
            password: hashedPassword,
            phone,
            role: finalRole,
            profile_url,
            email_verified,
            verification_token,
            verification_token_expires
        }
    });
    return newUser;
}



const resendVerificationEmailService = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    if (!user) {

        throw new Error('User not found');
    }
    if (user.email_verified) {
        error.statusCode = 404;
        throw new Error('Email already verified');
    }
    const verification_token = uuidv4();
    const verification_token_expires = new Date(Date.now() + 30 * 60 * 1000);
    const updatedUser = await prisma.users.update({
        where: {
            id_user: user.id_user
        },
        data: {
            verification_token,
            verification_token_expires
        }
    })
    return updatedUser;
}



const sendVerificationEmailService = async (email, token, name) => {
    const verificationLink = `http://localhost:3000/api/auth/verify-email/${token}`;
    const html = getVerificationTemplateEmail(name, token);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'verification for your email',
        html: html,

    };
    const result = await transporter.sendMail(mailOptions)
    if (result) {
        console.log('Verification email sent successfully');
    }
    else {
        console.log('Failed to send verification email');
    }

}

const verifyEmailService = async (token) => {
    const user = await prisma.users.findFirst({
        where: {
            verification_token: token,
        }
    })
    if (!user) {
        throw new Error('Token not found');
    }
    if (user.email_verified) {
        throw new Error('Email already verified');
    }
    if (user.verification_token_expires < new Date()) {
        throw new Error('Token expired');
    }
    const result = await prisma.users.update({
        where: {
            id_user: user.id_user
        },
        data: {
            email_verified: true,
            verification_token_expires: null
        }
    })
    return result;


}

const loginUserService = async (data) => {
    const { email, password } = data;
    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    if (user.email_verified === false) {
        const email = user.email;
        const result = await resendVerificationEmailService(email);
        await sendVerificationEmailService(email, result.verification_token, result.name)
        const error = new Error('Email not verified. A new verification link has been sent to your email');
        error.statusCode = 403;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error;
    }
    const accessToken = jwt.sign(
        {
            id_user: user.id_user,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        })
    const { password: _, verification_token, verification_token_expires, created_at, updated_at, deleted_at, email_verified, ...safeUser } = user
    return {
        accessToken,
        user: safeUser
    };
}


export default {
    registerUserService,
    sendVerificationEmailService,
    verifyEmailService,
    resendVerificationEmailService,
    loginUserService

}