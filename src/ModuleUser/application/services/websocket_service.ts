import WebSocket from 'ws';

export class WebSocketService {
    handleConnection(ws: WebSocket, user: any) {
        ws.on('message', (message: string) => {
            this.handleMessage(ws, message, user)
        });
        const client = {
            id: user.userId,
            username: user.username,
            permission: user.permission
        };
        ws.send(JSON.stringify({
            event: 'connect',
            data: client
        }));
    }
    handleMessage(ws: WebSocket, message: string, user: any) {
        console.log('Received message:', message, 'from user:', user);
        
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            ws.send('Error: Invalid message format');
            return;
        }

        const { type, payload } = parsedMessage;
        //payload es para informacion extra

        switch (type) {
            case 'hola':
                this.handleHola(ws, user);
                break;
            case 'bienvenido':
                this.handleBienvenido(ws, user);
                break;
            case 'adios':
                this.handleAdios(ws, user);
                break;
            default:
                ws.send(`Error: Unknown message type '${type}'`);
                break;
        }  this.handleHola(ws, user);

    }

    handleHola(ws: WebSocket, user: any) {
        ws.send(`Hola, ${user.username || 'usuario'}!`);
    }

    handleBienvenido(ws: WebSocket, user: any) {
        ws.send(`¡Bienvenido, ${user.username || 'usuario'}!`);
    }

    handleAdios(ws: WebSocket, user: any) {
        ws.send(`Adiós, ${user.username || 'usuario'}!`);
    }
    
}