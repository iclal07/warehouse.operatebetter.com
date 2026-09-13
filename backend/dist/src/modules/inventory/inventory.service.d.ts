import { PrismaService } from "../../database/prisma.service";
import { AdjustStockDto, CountDocumentDto, DispatchDocumentDto, DispatchStockDto, ReceiptDocumentDto, ReceiveStockDto, TransferDocumentDto, TransferStockDto } from "./dto/inventory-operation.dto";
import { InventoryGateway } from "./inventory.gateway";
import { InventoryRepository } from "./inventory.repository";
export declare class InventoryService {
    private readonly prisma;
    private readonly repository;
    private readonly gateway;
    constructor(prisma: PrismaService, repository: InventoryRepository, gateway: InventoryGateway);
    list(warehouseId?: string, shelfId?: string, productId?: string): Promise<{
        quantity: number;
        reservedQuantity: number;
        availableQuantity: number;
        warehouse: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            location: string;
            capacity: number;
        };
        shelf: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            code: string;
            capacity: number;
            zone: string;
        };
        product: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            sku: string;
            barcode: string | null;
            unit: string;
            minimumStock: number;
            categoryId: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        warehouseId: string;
        shelfId: string;
    }[]>;
    receiveStock(dto: ReceiveStockDto): Promise<{
        balance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    dispatchStock(dto: DispatchStockDto): Promise<{
        balance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    transferStock(dto: TransferStockDto): Promise<{
        sourceBalance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        targetBalance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    adjustStock(dto: AdjustStockDto): Promise<{
        systemQuantity: number;
        countedQuantity: number;
        difference: number;
        balance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    completeReceipt(dto: ReceiptDocumentDto): Promise<{
        receipt: {
            items: {
                id: string;
                productId: string;
                shelfId: string;
                quantity: number;
                receiptId: string;
            }[];
        } & {
            number: string;
            id: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            userId: string;
            notes: string | null;
            completedAt: Date | null;
        };
        balance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    completeDispatch(dto: DispatchDocumentDto): Promise<{
        dispatch: {
            items: {
                id: string;
                productId: string;
                shelfId: string;
                quantity: number;
                dispatchId: string;
            }[];
        } & {
            number: string;
            id: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            userId: string;
            notes: string | null;
            completedAt: Date | null;
        };
        balance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    completeTransfer(dto: TransferDocumentDto): Promise<{
        transfer: {
            items: {
                id: string;
                productId: string;
                quantity: number;
                sourceShelfId: string;
                targetShelfId: string;
                transferId: string;
            }[];
        } & {
            number: string;
            id: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            sourceWarehouseId: string;
            targetWarehouseId: string;
            notes: string | null;
            completedAt: Date | null;
        };
        sourceBalance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        targetBalance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    completeCount(dto: CountDocumentDto): Promise<{
        count: {
            items: {
                id: string;
                productId: string;
                shelfId: string;
                countedQuantity: number;
                systemQuantity: number;
                difference: number;
                countId: string;
            }[];
        } & {
            number: string;
            id: string;
            status: import(".prisma/client").$Enums.DocumentStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            userId: string;
            notes: string | null;
            completedAt: Date | null;
        };
        balance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        };
        movement: {
            id: string;
            createdAt: Date;
            productId: string;
            quantity: number;
            userId: string;
            description: string | null;
            sourceWarehouseId: string | null;
            sourceShelfId: string | null;
            targetWarehouseId: string | null;
            targetShelfId: string | null;
            type: import(".prisma/client").$Enums.MovementType;
            referenceType: string | null;
            referenceId: string | null;
        };
    }>;
    private assertShelf;
    private createMovement;
    private publish;
    private documentNumber;
}
