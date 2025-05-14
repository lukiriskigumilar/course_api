import fs from 'fs';
import path from 'path';


export const getVerificationTemplateEmail = (name, token) => {
    // Menentukan path yang benar menuju file email_verification.html
    const filePath = path.join('src','utils', 'html', 'email_verification.html');
    
    try {
        // Membaca file template HTML
        let html = fs.readFileSync(filePath, 'utf-8');

        // Mengganti placeholder dalam template dengan data yang relevan
        return html
            .replace(/{{name}}/g, name)
            .replace(/{{token}}/g, token)
            .replace(/{{link}}/g, `http://localhost:3000/api/auth/verify-email/${token}`);
    } catch (error) {
        console.error('Error reading file:', error.message);
        throw new Error('Failed to read email template');
    }
}
