import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { ProductQueryDto } from "./dto/product-query.dto";
export declare class ProductsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPage(query: ProductQueryDto): Promise<{
        items: ({
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
            };
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
            name: string;
            description: string | null;
            sku: string;
            barcode: string | null;
            unit: string;
            minimumStock: number;
            categoryId: string;
        })[];
        total: number;
    }>;
    findById(id: string): Prisma.Prisma__ProductClient<({
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
        };
        movements: ({
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
        balances: ({
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
        name: string;
        description: string | null;
        sku: string;
        barcode: string | null;
        unit: string;
        minimumStock: number;
        categoryId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    create(data: Prisma.ProductUncheckedCreateInput): Prisma.Prisma__ProductClient<{
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
        };
    } & {
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
