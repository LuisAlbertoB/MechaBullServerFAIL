import http from 'http';
import { app } from '../../app';
import { setupWebSocket } from '../../ModuleUser/infraestructure/ws/socketServer'
import { WebSocketService } from '../../ModuleUser/application/services/websocket_service';

const startServer = () => {
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;
  const webSocketService = new WebSocketService

  // Configurar WebSocket
  new setupWebSocket(server, webSocketService);

  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};


export { startServer };
