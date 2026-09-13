import { MovementType } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
export declare class StockMovementsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(productId?: string, warehouseId?: string, type?: MovementType): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            email: string;
            id: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            role: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
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
        sourceWarehouse: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            location: string;
            capacity: number;
        } | null;
        targetWarehouse: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            location: string;
            capacity: number;
        } | null;
        sourceShelf: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            code: string;
            capacity: number;
            zone: string;
        } | null;
        targetShelf: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            code: string;
            capacity: number;
            zone: string;
        } | null;
    } & {
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
    })[]>;
}
