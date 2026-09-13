import { CreateProductDto } from "./dto/create-product.dto";
import { ProductQueryDto } from "./dto/product-query.dto";
import { ProductsRepository } from "./products.repository";
export declare class ProductsService {
    private readonly repository;
    constructor(repository: ProductsRepository);
    list(query: ProductQueryDto): Promise<{
        data: {
            balances: undefined;
            totalStock: number;
            isCritical: boolean;
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
            };
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
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    detail(id: string): Promise<{
        totalStock: number;
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
    }>;
    create(dto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
