import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const secureFolderPath = './src/ModuleUser/infraestructure/auth/secure';
const secretKey = process.env.SECRET_KEY

export let currentSecretKey = ''

interface ClaveSecretaData {
    fechaActualizacion: string;
    claveSecreta: string;
}

// Función para generar una nueva clave secreta
async function generarNuevaSecretKey(): Promise<string> {
    try {
        const bytes = await crypto.randomBytes(32);
        const nuevaSecretKey = secretKey + bytes.toString('base64');
        return nuevaSecretKey;
    } catch (error) {
        console.error('Error al generar nueva clave secreta:', error);
        throw error;
    }
}
// Función para guardar la clave secreta en un archivo
function saveSecretKey(nuevaSecretKey: string): void {
    try {
        const filePath = path.join(secureFolderPath, 'clave_secreta.json');
        if (!fs.existsSync(secureFolderPath)) {
            fs.mkdirSync(secureFolderPath, { recursive: true });
        }
        const now = new Date().toISOString();
        const claveSecretaData: ClaveSecretaData = {
            fechaActualizacion: now,
            claveSecreta: nuevaSecretKey
        };
        const content = JSON.stringify(claveSecretaData, null, 2);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Clave secreta actualizada y guardada.');
    } catch (error) {
        console.error('Error al guardar la nueva clave secreta:', error);
        throw error;
    }
}

function loadSecretKeyFromFile() {
    try {
        const filePath = path.join(secureFolderPath, 'clave_secreta.json');
        if (fs.existsSync(filePath)) {
            const contenidoArchivo = fs.readFileSync(filePath, 'utf8');
            const claveSecretaData: ClaveSecretaData = JSON.parse(contenidoArchivo);
            console.log('Clave secreta cargada desde el archivo.');
            currentSecretKey = claveSecretaData.claveSecreta;
            return claveSecretaData;
        } else {
            console.warn('El archivo de clave secreta no existe.');
            return null;
        }
    } catch (error) {
        console.error('Error al cargar la clave secreta desde el archivo:', error);
        throw error;
    }
}
function calcularTiempoTranscurrido(fechaActualizacion: string): number {
    const fechaActualizacionDate = new Date(fechaActualizacion);
    const ahora = new Date();
    return ahora.getTime() - fechaActualizacionDate.getTime();
}

export async function init() {
    try {
        const claveSecretaData = loadSecretKeyFromFile();
        if (!claveSecretaData || !claveSecretaData.claveSecreta) {
            const nuevaSecretKey = await generarNuevaSecretKey();
            saveSecretKey(nuevaSecretKey);
            loadSecretKeyFromFile()
        } else {
            const { fechaActualizacion, claveSecreta } = claveSecretaData;
            const tiempoTranscurrido = calcularTiempoTranscurrido(fechaActualizacion);
            // Si ha pasado más de una semana, generar una nueva clave secreta y actualizar
            if (tiempoTranscurrido >= 7 * 24 * 60 * 60 * 1000) {
                const nuevaSecretKey = await generarNuevaSecretKey();
                console.log('Nueva clave secreta generada:', nuevaSecretKey);
                saveSecretKey(nuevaSecretKey);
                loadSecretKeyFromFile();
            } else {
                console.log('No ha pasado suficiente tiempo desde la última actualización.');
            }
        }
    } catch (error) {
        console.error('Error al iniciar:', error);
    }
}

