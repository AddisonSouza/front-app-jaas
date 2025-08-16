import { useEffect, useState } from "react";
import { createWebSocket } from "../api/socket";

export default function useWebSocket() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = createWebSocket(setData);
    return () => socket.close();
  }, []);

  return data;
}
