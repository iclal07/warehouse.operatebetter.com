import { Prisma, StockBalance } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
type DbClient = Prisma.TransactionClient | PrismaService;
export declare class InventoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findBalance(client: DbClient, productId: string, warehouseId: string, shelfId: string): Prisma.Prisma__StockBalanceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        warehouseId: string;
        shelfId: string;
        quantity: number;
        reservedQuantity: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    increment(client: DbClient, productId: string, warehouseId: string, shelfId: string, quantity: number): Prisma.Prisma__StockBalanceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        warehouseId: string;
        shelfId: string;
        quantity: number;
        reservedQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    decrement(client: DbClient, balance: StockBalance, quantity: number): Prisma.Prisma__StockBalanceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        warehouseId: string;
        shelfId: string;
        quantity: number;
        reservedQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    setQuantity(client: DbClient, productId: string, warehouseId: string, shelfId: string, quantity: number): Prisma.Prisma__StockBalanceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        warehouseId: string;
        shelfId: string;
        quantity: number;
        reservedQuantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
export {};
