import { PrismaService } from "../../database/prisma.service";
export declare class WarehousesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            shelves: number;
            balances: number;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        location: string;
        capacity: number;
    })[]>;
    detail(id: string): Promise<{
        stock: number;
        occupancyRate: number;
        shelves: ({
            balances: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                warehouseId: string;
                shelfId: string;
                quantity: number;
                reservedQuantity: number;
            }[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            code: string;
            capacity: number;
            zone: string;
        })[];
        balances: ({
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
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            warehouseId: string;
            shelfId: string;
            quantity: number;
            reservedQuantity: number;
        })[];
        sourceMoves: ({
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
        name: string;
        code: string;
        location: string;
        capacity: number;
    }>;
}
