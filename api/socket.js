const SOCKET_URL = "ws://192.168.100.2:7777"; // IP do servidor WebSocket

export const createWebSocket = (onMessage) => {
  const socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    console.log("🔗 Conectado ao servidor WebSocket");
  };

  socket.onmessage = (event) => {
    try {
      console.log("📦 Dados recebidos:", event.data);

      // Faz parse do JSON
      const data = JSON.parse(event.data);

      // Extrai os dados do sensor MQ4
      let dadosSensor = null;

      if (
        data.type === "sensor_data" &&
        data.sensor === "MQ4" &&
        data.data &&
        data.data.mq4 !== undefined
      ) {
        dadosSensor = data.data.mq4;
        console.log("🔍 Valor do sensor MQ4:", dadosSensor);

        // Retorna os dados formatados
        onMessage({
          value: dadosSensor,
          timestamp: data.timestamp || new Date().toISOString(),
          sensor: data.sensor,
          rawData: data,
        });
      } else {
        console.warn("⚠️ Formato de dados não reconhecido:", data);
        onMessage({
          value: "Formato inválido",
          timestamp: new Date().toISOString(),
          rawData: data,
        });
      }
    } catch (_error) {
      console.warn(
        "⚠️ Dados não são JSON válido, enviando como texto:",
        event.data
      );

      // Se não for JSON, trata como texto simples
      const rawData = event.data.toString().trim();
      const value =
        !isNaN(rawData) && rawData !== "" ? parseFloat(rawData) : rawData;

      onMessage({ value: value, timestamp: new Date().toISOString() });
    }
  };

  socket.onerror = (error) => {
    console.error("⚠️ Erro WebSocket:", error);
  };

  socket.onclose = () => {
    console.log("❌ Conexão fechada");
  };

  return socket;
};
