import http from 'http';
import { app } from '../../../app';
//import { setupWebSocket } from '../webSocket/webSocketServer';

const startServer = () => {
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;

  // Configurar WebSocket
  //setupWebSocket(server);

  // Arrancar el servidor HTTP
  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

export { startServer };
