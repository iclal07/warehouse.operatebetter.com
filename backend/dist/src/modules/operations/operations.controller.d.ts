import { PrismaService } from "../../database/prisma.service";
import { CountDocumentDto, DispatchDocumentDto, ReceiptDocumentDto, TransferDocumentDto } from "../inventory/dto/inventory-operation.dto";
import { InventoryService } from "../inventory/inventory.service";
export declare class ReceiptsController {
    private readonly inventory;
    private readonly prisma;
    constructor(inventory: InventoryService, prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
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
        items: ({
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
        } & {
            id: string;
            productId: string;
            shelfId: string;
            quantity: number;
            receiptId: string;
        })[];
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
    })[]>;
    create(dto: ReceiptDocumentDto, userId: string): Promise<{
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
}
export declare class DispatchesController {
    private readonly inventory;
    private readonly prisma;
    constructor(inventory: InventoryService, prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
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
        items: ({
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
        } & {
            id: string;
            productId: string;
            shelfId: string;
            quantity: number;
            dispatchId: string;
        })[];
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
    })[]>;
    create(dto: DispatchDocumentDto, userId: string): Promise<{
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
}
export declare class TransfersController {
    private readonly inventory;
    private readonly prisma;
    constructor(inventory: InventoryService, prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
        sourceWarehouse: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            location: string;
            capacity: number;
        };
        targetWarehouse: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            location: string;
            capacity: number;
        };
        items: ({
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
        } & {
            id: string;
            productId: string;
            quantity: number;
            sourceShelfId: string;
            targetShelfId: string;
            transferId: string;
        })[];
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
    })[]>;
    create(dto: TransferDocumentDto, userId: string): Promise<{
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
}
export declare class StockCountsController {
    private readonly inventory;
    private readonly prisma;
    constructor(inventory: InventoryService, prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
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
        items: ({
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
        } & {
            id: string;
            productId: string;
            shelfId: string;
            countedQuantity: number;
            systemQuantity: number;
            difference: number;
            countId: string;
        })[];
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
    })[]>;
    create(dto: CountDocumentDto, userId: string): Promise<{
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
}
