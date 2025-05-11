import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/client.js';


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
    const existingUser = await prisma.users.findFirst({
        where: {
            OR: [{ email }, { phone }]
        }
    });
    if (existingUser) {
        const confictedField = existingUser.email === email ? 'email addres' : 'phone number';
        throw new Error(`${confictedField} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verification_token = uuidv4();
    const email_verified = false;
    const verification_token_expires = new Date(Date.now() + 30 * 60 * 1000);

    const newUser = await prisma.users.create({
        data: {
            id_user,
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            profile_url,
            email_verified,
            verification_token,
            verification_token_expires
        }
    });
    return newUser;
}


export default {
    registerUserService
}