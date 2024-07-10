import jwt from 'jsonwebtoken';
import { currentSecretKey } from './secure/claves';

const expires = {
    expiresIn: '30s'
};

export async function generarToken(id:string, username:string): Promise<string> {
    await esperaActualizacionSecretKey();
    const payload = {
        userId: id,
        username: username,
        permission: 'client'
    };
    return jwt.sign(payload, currentSecretKey, expires);
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

