import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

export type StockEvent =
  | "stock.updated"
  | "stock.received"
  | "stock.dispatched"
  | "stock.transferred"
  | "stock.counted";

@WebSocketGateway({ namespace: "/inventory", cors: { origin: true, credentials: true } })
export class InventoryGateway {
  @WebSocketServer()
  private server!: Server;

  emit(event: StockEvent, payload: unknown) {
    this.server.emit(event, payload);
  }
}
