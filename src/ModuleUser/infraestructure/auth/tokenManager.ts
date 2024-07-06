import jwt from 'jsonwebtoken';
import { currentSecretKey } from './secure/claves';

const expires = {
    expiresIn: '30s' // El token expirará en 30s
};

// Función para generar un token JWT con la clave secreta actual
export async function generarToken(): Promise<string> {
    await esperaActualizacionSecretKey();
    const payload = {
        userId: '123456',
        username: 'ejemploUsuario',
    };
    const token = jwt.sign(payload, currentSecretKey, expires);
    console.log("\nel toke del cliente: ",token,"\n")
    return token
}
async function esperaActualizacionSecretKey(): Promise<void> {
    return new Promise<void>((resolve) => {
        const intervalo = setInterval(() => {
            if (currentSecretKey !== '') {
                clearInterval(intervalo);
                resolve();
            }
        }, 100); 
    });
}

export function verifyToken(token: string): any {
    try {
        const decoded = jwt.verify(token, currentSecretKey);
        return decoded;
    } catch (error) {
        throw new Error('Token inválido');
    }
}

generarToken()

