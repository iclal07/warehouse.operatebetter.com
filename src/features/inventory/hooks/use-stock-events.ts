import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { productKeys } from "../../products/hooks/use-products";

const socketUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1")
  .replace(/\/api\/v1\/?$/, "");

export function useStockEvents() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(`${socketUrl}/inventory`, { transports: ["websocket"] });
    const invalidate = () => {
      void queryClient.invalidateQueries({ queryKey: ["inventory"] });
      void queryClient.invalidateQueries({ queryKey: productKeys.all });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    };
    socket.on("stock.updated", invalidate);
    return () => {
      socket.off("stock.updated", invalidate);
      socket.disconnect();
    };
  }, [queryClient]);
}
