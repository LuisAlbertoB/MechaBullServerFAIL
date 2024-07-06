import { Server as HTTPServer } from 'http';
import * as http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { verifyToken } from '../auth/tokenManager';
import { WebSocketService } from '../../application/services/websocket_service';

export class setupWebSocket{
  private wss: WebSocketServer;
  private connectedClients = 0;
  private readonly MAX_CONNECTIONS = 5;
  private webSocketService: WebSocketService;

  constructor(server: HTTPServer, webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
    this.wss = new WebSocketServer({ server });
    
    this.wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
        this.handleConnection(ws, req);
    });
  }
  private handleConnection(ws: WebSocket, req: http.IncomingMessage) {
        if (this.connectedClients >= this.MAX_CONNECTIONS) {
            ws.close(1000, 'Too many connections');
            return;
        }
        this.connectedClients++;
        
        const token = new URL(req.url!, `http://${req.headers.host}`).searchParams.get('token');
        if (token) {
            try {
                const decoded = verifyToken(token);
                const checkTokenInterval = setInterval(() => {
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp && currentTime > decoded.exp) {
                        ws.close(1008, 'Token expired');
                        clearInterval(checkTokenInterval);
                    }
                }, 1000);
                this.webSocketService.handleConnection(ws, decoded);
            } catch (err) {
                ws.close(1008, 'Invalid token');
            }
        } else {
            ws.close(1008, 'Token required');
        }
    }
};

