import transporter from '../config/email.nodemailer';


export class EmailService{
    constructor(){}


    //Email para dar la bienvenida al usuario y verificar su cuenta
    async sendWelcomeEmailAndVerification(email:string, name:string, verificationToken:string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Bienvenido a PetPal',
            text: `Hola ${name},\n\nGracias por registrarte en PetPal. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:\n\nhttp://localhost:4500/api/user/verify/${verificationToken}\n\nSaludos,\nEl equipo de PetPal`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            throw new Error('No se pudo enviar el correo electrónico de verificación');
        }
    }
}