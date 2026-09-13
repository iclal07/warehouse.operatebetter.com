import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboard;
    constructor(dashboard: DashboardService);
    overview(): Promise<{
        metrics: {
            totalProducts: number;
            totalStock: number;
            criticalStock: number;
            todayReceived: number;
            todayDispatched: number;
        };
        criticalProducts: {
            totalStock: number;
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
        }[];
        recentMovements: ({
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
        })[];
        warehouseOccupancy: {
            id: string;
            name: string;
            capacity: number;
            used: number;
            rate: number;
        }[];
    }>;
}
