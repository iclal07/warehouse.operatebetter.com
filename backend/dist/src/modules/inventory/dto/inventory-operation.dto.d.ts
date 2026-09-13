export declare class ReceiveStockDto {
    productId: string;
    warehouseId: string;
    shelfId: string;
    quantity: number;
    userId: string;
    description?: string;
}
export declare class DispatchStockDto extends ReceiveStockDto {
}
export declare class TransferStockDto {
    productId: string;
    sourceWarehouseId: string;
    sourceShelfId: string;
    targetWarehouseId: string;
    targetShelfId: string;
    quantity: number;
    userId: string;
    description?: string;
}
export declare class AdjustStockDto {
    productId: string;
    warehouseId: string;
    shelfId: string;
    countedQuantity: number;
    userId: string;
    description?: string;
}
export declare class ReceiptDocumentDto extends ReceiveStockDto {
    number?: string;
}
export declare class DispatchDocumentDto extends DispatchStockDto {
    number?: string;
}
export declare class TransferDocumentDto extends TransferStockDto {
    number?: string;
}
export declare class CountDocumentDto extends AdjustStockDto {
    number?: string;
}
