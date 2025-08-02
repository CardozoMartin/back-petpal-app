import transporter from '../config/email.nodemailer';
import { injectable } from 'tsyringe';

@injectable()
export class EmailService{
    constructor(){}


    //Email para dar la bienvenida al usuario y verificar su cuenta
    async sendWelcomeEmailAndVerification(email: string, name: string, verificationToken: string): Promise<void> {
    const verificationUrl = `http://localhost:4500/api/user/verify/${verificationToken}`;
    
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a PetPal</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                <div style="background-color: #ffffff; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <span style="font-size: 36px;">🐾</span>
                </div>
                <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    PetPal
                </h1>
                <p style="color: #e8f0fe; margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">
                    Tu compañero digital para el cuidado de mascotas
                </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #2c3e50; margin: 0 0 16px 0; font-size: 28px; font-weight: 600;">
                        ¡Bienvenido, ${name}! 🎉
                    </h2>
                    <p style="color: #34495e; font-size: 18px; line-height: 1.6; margin: 0;">
                        Estamos emocionados de tenerte en nuestra comunidad de amantes de las mascotas.
                    </p>
                </div>

                <!-- Features Section -->
                <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 30px 0;">
                    <h3 style="color: #2c3e50; text-align: center; margin: 0 0 20px 0; font-size: 20px;">
                        Con PetPal podrás:
                    </h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                        <div style="text-align: center; flex: 1; min-width: 120px;">
                            <div style="font-size: 24px; margin-bottom: 8px;">🏥</div>
                            <p style="color: #5a6c7d; font-size: 14px; margin: 0; line-height: 1.4;">Gestionar citas veterinarias</p>
                        </div>
                        <div style="text-align: center; flex: 1; min-width: 120px;">
                            <div style="font-size: 24px; margin-bottom: 8px;">💊</div>
                            <p style="color: #5a6c7d; font-size: 14px; margin: 0; line-height: 1.4;">Recordatorios de medicamentos</p>
                        </div>
                        <div style="text-align: center; flex: 1; min-width: 120px;">
                            <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
                            <p style="color: #5a6c7d; font-size: 14px; margin: 0; line-height: 1.4;">Seguimiento de salud</p>
                        </div>
                    </div>
                </div>

                <!-- Verification Section -->
                <div style="text-align: center; margin: 35px 0;">
                    <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                        <span style="font-size: 24px; margin-right: 8px;">⚠️</span>
                        <span style="color: #856404; font-weight: 500;">
                            Para empezar, necesitas verificar tu cuenta
                        </span>
                    </div>
                    
                    <a href="${verificationUrl}" 
                       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; border: none; cursor: pointer;">
                        ✨ Verificar mi cuenta
                    </a>
                    
                    <p style="color: #6c757d; font-size: 14px; margin: 20px 0 0 0; line-height: 1.5;">
                        Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                        <span style="color: #667eea; word-break: break-all; font-family: monospace; background-color: #f8f9fa; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 8px;">
                            ${verificationUrl}
                        </span>
                    </p>
                </div>

                <!-- Security Note -->
                <div style="background-color: #e8f4fd; border-left: 4px solid #3498db; padding: 15px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <p style="color: #2980b9; margin: 0; font-size: 14px; line-height: 1.5;">
                        <strong>🔒 Nota de seguridad:</strong> Este enlace expirará en 24 horas por tu seguridad. Si no solicitaste esta cuenta, puedes ignorar este correo.
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
                <div style="margin-bottom: 20px;">
                    <span style="font-size: 24px; margin-right: 8px;">🐾</span>
                    <span style="color: #ecf0f1; font-weight: 600; font-size: 18px;">PetPal</span>
                </div>
                
                <p style="color: #bdc3c7; font-size: 14px; margin: 0 0 15px 0; line-height: 1.6;">
                    Gracias por confiar en nosotros para el cuidado de tus mascotas.<br>
                    Si tienes alguna pregunta, no dudes en contactarnos.
                </p>
                
                <div style="border-top: 1px solid #34495e; padding-top: 20px; margin-top: 20px;">
                    <p style="color: #95a5a6; font-size: 12px; margin: 0; line-height: 1.4;">
                        © 2025 PetPal. Todos los derechos reservados.<br>
                        Este correo fue enviado a ${email}
                    </p>
                </div>
            </div>
        </div>

        <!-- Mobile Responsiveness -->
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; }
                .content { padding: 20px !important; }
                .button { padding: 14px 28px !important; font-size: 16px !important; }
                .features { flex-direction: column !important; }
                .feature-item { margin-bottom: 15px !important; }
            }
        </style>
    </body>
    </html>
    `;

    // Versión texto plano como fallback
    const textVersion = `
🐾 PetPal - Bienvenido, ${name}!

Gracias por registrarte en PetPal, tu compañero digital para el cuidado de mascotas.

Con PetPal podrás:
• Gestionar citas veterinarias
• Configurar recordatorios de medicamentos  
• Hacer seguimiento de la salud de tus mascotas

IMPORTANTE: Para empezar a usar la app, necesitas verificar tu cuenta.

Haz clic en este enlace para verificar:
${verificationUrl}

🔒 Nota de seguridad: Este enlace expirará en 24 horas.

Si tienes alguna pregunta, no dudes en contactarnos.

Saludos,
El equipo de PetPal 🐾

© 2025 PetPal. Todos los derechos reservados.
    `;

    const mailOptions = {
        from: `"PetPal 🐾" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🐾 ¡Bienvenido a PetPal! Verifica tu cuenta',
        text: textVersion,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email de verificación enviado exitosamente a: ${email}`);
    } catch (error) {
        console.error('❌ Error al enviar el correo electrónico:', error);
        throw new Error('No se pudo enviar el correo electrónico de verificación');
    }
}
}