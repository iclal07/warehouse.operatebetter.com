import { ShelvesService } from "./shelves.service";
export declare class ShelvesController {
    private readonly shelves;
    constructor(shelves: ShelvesService);
    list(warehouseId?: string): import(".prisma/client").Prisma.PrismaPromise<({
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
        balances: ({
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
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        code: string;
        capacity: number;
        zone: string;
    })[]>;
    detail(id: string): Promise<{
        used: number;
        occupancyRate: number;
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
        balances: ({
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
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        })[];
        sourceMoves: ({
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
        })[];
        id: string;
        status: import(".prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        code: string;
        capacity: number;
        zone: string;
    }>;
}
