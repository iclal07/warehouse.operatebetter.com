export type StockEvent = "stock.updated" | "stock.received" | "stock.dispatched" | "stock.transferred" | "stock.counted";
export declare class InventoryGateway {
    private server;
    emit(event: StockEvent, payload: unknown): void;
}
