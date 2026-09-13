import { PrismaService } from "../../database/prisma.service";
export declare class CategoriesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
        _count: {
            products: number;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
    })[]>;
}
export declare class SearchController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(query?: string): Promise<{
        products: {
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
        warehouses: {
            id: string;
            status: import(".prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            location: string;
            capacity: number;
        }[];
        shelves: ({
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
    }>;
}
export declare class NotificationsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        message: string;
        readAt: Date | null;
    }[]>;
    markRead(id: string, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    markAllRead(userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
