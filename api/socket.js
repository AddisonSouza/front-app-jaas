const SOCKET_URL = "ws://192.168.0.100:7777"; // IP do servidor WebSocket

export const createWebSocket = (onMessage) => {
  const socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    console.log("🔗 Conectado ao servidor WebSocket");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("⚠️ Erro WebSocket:", error);
  };

  socket.onclose = () => {
    console.log("❌ Conexão fechada");
  };

  return socket;
};
