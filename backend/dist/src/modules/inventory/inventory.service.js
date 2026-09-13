"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../../database/prisma.service");
const inventory_gateway_1 = require("./inventory.gateway");
const inventory_repository_1 = require("./inventory.repository");
let InventoryService = class InventoryService {
    prisma;
    repository;
    gateway;
    constructor(prisma, repository, gateway) {
        this.prisma = prisma;
        this.repository = repository;
        this.gateway = gateway;
    }
    async list(warehouseId, shelfId, productId) {
        const balances = await this.prisma.stockBalance.findMany({
            where: { warehouseId, shelfId, productId },
            include: { product: true, warehouse: true, shelf: true },
            orderBy: { updatedAt: "desc" },
        });
        return balances.map(({ reservedQuantity, quantity, ...balance }) => ({
            ...balance,
            quantity,
            reservedQuantity,
            availableQuantity: quantity - reservedQuantity,
        }));
    }
    async receiveStock(dto) {
        await this.assertShelf(dto.warehouseId, dto.shelfId);
        const result = await this.prisma.$transaction(async (tx) => {
            const balance = await this.repository.increment(tx, dto.productId, dto.warehouseId, dto.shelfId, dto.quantity);
            const movement = await this.createMovement(tx, {
                type: "IN",
                productId: dto.productId,
                targetWarehouseId: dto.warehouseId,
                targetShelfId: dto.shelfId,
                quantity: dto.quantity,
                description: dto.description,
                userId: dto.userId,
            });
            return { balance, movement };
        });
        this.publish("stock.received", result);
        return result;
    }
    async dispatchStock(dto) {
        await this.assertShelf(dto.warehouseId, dto.shelfId);
        const result = await this.prisma.$transaction(async (tx) => {
            const balance = await this.repository.findBalance(tx, dto.productId, dto.warehouseId, dto.shelfId);
            if (!balance)
                throw new common_1.NotFoundException("Stok kaydı bulunamadı");
            if (balance.quantity - balance.reservedQuantity < dto.quantity) {
                throw new common_1.BadRequestException("Kullanılabilir stok yetersiz");
            }
            const updated = await this.repository.decrement(tx, balance, dto.quantity);
            const movement = await this.createMovement(tx, {
                type: "OUT",
                productId: dto.productId,
                sourceWarehouseId: dto.warehouseId,
                sourceShelfId: dto.shelfId,
                quantity: dto.quantity,
                description: dto.description,
                userId: dto.userId,
            });
            return { balance: updated, movement };
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        this.publish("stock.dispatched", result);
        return result;
    }
    async transferStock(dto) {
        if (dto.sourceShelfId === dto.targetShelfId) {
            throw new common_1.BadRequestException("Kaynak ve hedef raf aynı olamaz");
        }
        await Promise.all([
            this.assertShelf(dto.sourceWarehouseId, dto.sourceShelfId),
            this.assertShelf(dto.targetWarehouseId, dto.targetShelfId),
        ]);
        const result = await this.prisma.$transaction(async (tx) => {
            const source = await this.repository.findBalance(tx, dto.productId, dto.sourceWarehouseId, dto.sourceShelfId);
            if (!source || source.quantity - source.reservedQuantity < dto.quantity) {
                throw new common_1.BadRequestException("Kaynak rafta kullanılabilir stok yetersiz");
            }
            const sourceBalance = await this.repository.decrement(tx, source, dto.quantity);
            const targetBalance = await this.repository.increment(tx, dto.productId, dto.targetWarehouseId, dto.targetShelfId, dto.quantity);
            const movement = await this.createMovement(tx, {
                type: "TRANSFER",
                productId: dto.productId,
                sourceWarehouseId: dto.sourceWarehouseId,
                sourceShelfId: dto.sourceShelfId,
                targetWarehouseId: dto.targetWarehouseId,
                targetShelfId: dto.targetShelfId,
                quantity: dto.quantity,
                description: dto.description,
                userId: dto.userId,
            });
            return { sourceBalance, targetBalance, movement };
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        this.publish("stock.transferred", result);
        return result;
    }
    async adjustStock(dto) {
        await this.assertShelf(dto.warehouseId, dto.shelfId);
        const result = await this.prisma.$transaction(async (tx) => {
            const current = await this.repository.findBalance(tx, dto.productId, dto.warehouseId, dto.shelfId);
            const systemQuantity = current?.quantity ?? 0;
            const difference = dto.countedQuantity - systemQuantity;
            const balance = await this.repository.setQuantity(tx, dto.productId, dto.warehouseId, dto.shelfId, dto.countedQuantity);
            const movement = await this.createMovement(tx, {
                type: "COUNT_CORRECTION",
                productId: dto.productId,
                sourceWarehouseId: dto.warehouseId,
                sourceShelfId: dto.shelfId,
                quantity: difference,
                description: dto.description,
                userId: dto.userId,
            });
            return { systemQuantity, countedQuantity: dto.countedQuantity, difference, balance, movement };
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        this.publish("stock.counted", result);
        return result;
    }
    async completeReceipt(dto) {
        await this.assertShelf(dto.warehouseId, dto.shelfId);
        const result = await this.prisma.$transaction(async (tx) => {
            const receipt = await tx.goodsReceipt.create({
                data: {
                    number: dto.number ?? this.documentNumber("GR"),
                    warehouseId: dto.warehouseId,
                    status: "COMPLETED",
                    notes: dto.description,
                    userId: dto.userId,
                    completedAt: new Date(),
                    items: { create: { productId: dto.productId, shelfId: dto.shelfId, quantity: dto.quantity } },
                },
                include: { items: true },
            });
            const balance = await this.repository.increment(tx, dto.productId, dto.warehouseId, dto.shelfId, dto.quantity);
            const movement = await this.createMovement(tx, {
                type: "IN", productId: dto.productId, targetWarehouseId: dto.warehouseId,
                targetShelfId: dto.shelfId, quantity: dto.quantity, userId: dto.userId,
                description: dto.description, referenceType: "GOODS_RECEIPT", referenceId: receipt.id,
            });
            await tx.notification.create({
                data: {
                    type: "RECEIPT_COMPLETED",
                    title: "Mal kabul tamamlandı",
                    message: `${receipt.number} numaralı mal kabul tamamlandı.`,
                    userId: dto.userId,
                },
            });
            return { receipt, balance, movement };
        });
        this.publish("stock.received", result);
        return result;
    }
    async completeDispatch(dto) {
        await this.assertShelf(dto.warehouseId, dto.shelfId);
        const result = await this.prisma.$transaction(async (tx) => {
            const current = await this.repository.findBalance(tx, dto.productId, dto.warehouseId, dto.shelfId);
            if (!current || current.quantity - current.reservedQuantity < dto.quantity) {
                throw new common_1.BadRequestException("Kullanılabilir stok yetersiz");
            }
            const dispatch = await tx.goodsDispatch.create({
                data: {
                    number: dto.number ?? this.documentNumber("GD"),
                    warehouseId: dto.warehouseId,
                    status: "COMPLETED",
                    notes: dto.description,
                    userId: dto.userId,
                    completedAt: new Date(),
                    items: { create: { productId: dto.productId, shelfId: dto.shelfId, quantity: dto.quantity } },
                },
                include: { items: true },
            });
            const balance = await this.repository.decrement(tx, current, dto.quantity);
            const movement = await this.createMovement(tx, {
                type: "OUT", productId: dto.productId, sourceWarehouseId: dto.warehouseId,
                sourceShelfId: dto.shelfId, quantity: dto.quantity, userId: dto.userId,
                description: dto.description, referenceType: "GOODS_DISPATCH", referenceId: dispatch.id,
            });
            if (balance.quantity === 0) {
                await tx.notification.create({
                    data: {
                        type: "OUT_OF_STOCK",
                        title: "Stok tükendi",
                        message: "Mal çıkışı sonrasında ürün stoğu tükendi.",
                        userId: dto.userId,
                    },
                });
            }
            return { dispatch, balance, movement };
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        this.publish("stock.dispatched", result);
        return result;
    }
    async completeTransfer(dto) {
        if (dto.sourceShelfId === dto.targetShelfId)
            throw new common_1.BadRequestException("Kaynak ve hedef raf aynı olamaz");
        await Promise.all([
            this.assertShelf(dto.sourceWarehouseId, dto.sourceShelfId),
            this.assertShelf(dto.targetWarehouseId, dto.targetShelfId),
        ]);
        const result = await this.prisma.$transaction(async (tx) => {
            const source = await this.repository.findBalance(tx, dto.productId, dto.sourceWarehouseId, dto.sourceShelfId);
            if (!source || source.quantity - source.reservedQuantity < dto.quantity) {
                throw new common_1.BadRequestException("Kaynak rafta kullanılabilir stok yetersiz");
            }
            const transfer = await tx.stockTransfer.create({
                data: {
                    number: dto.number ?? this.documentNumber("TR"),
                    sourceWarehouseId: dto.sourceWarehouseId,
                    targetWarehouseId: dto.targetWarehouseId,
                    status: "COMPLETED",
                    notes: dto.description,
                    userId: dto.userId,
                    completedAt: new Date(),
                    items: { create: {
                            productId: dto.productId, sourceShelfId: dto.sourceShelfId,
                            targetShelfId: dto.targetShelfId, quantity: dto.quantity,
                        } },
                },
                include: { items: true },
            });
            const sourceBalance = await this.repository.decrement(tx, source, dto.quantity);
            const targetBalance = await this.repository.increment(tx, dto.productId, dto.targetWarehouseId, dto.targetShelfId, dto.quantity);
            const movement = await this.createMovement(tx, {
                type: "TRANSFER", productId: dto.productId, sourceWarehouseId: dto.sourceWarehouseId,
                sourceShelfId: dto.sourceShelfId, targetWarehouseId: dto.targetWarehouseId,
                targetShelfId: dto.targetShelfId, quantity: dto.quantity, userId: dto.userId,
                description: dto.description, referenceType: "STOCK_TRANSFER", referenceId: transfer.id,
            });
            await tx.notification.create({
                data: {
                    type: "TRANSFER_COMPLETED",
                    title: "Transfer tamamlandı",
                    message: `${transfer.number} numaralı transfer tamamlandı.`,
                    userId: dto.userId,
                },
            });
            return { transfer, sourceBalance, targetBalance, movement };
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        this.publish("stock.transferred", result);
        return result;
    }
    async completeCount(dto) {
        await this.assertShelf(dto.warehouseId, dto.shelfId);
        const result = await this.prisma.$transaction(async (tx) => {
            const current = await this.repository.findBalance(tx, dto.productId, dto.warehouseId, dto.shelfId);
            const systemQuantity = current?.quantity ?? 0;
            const difference = dto.countedQuantity - systemQuantity;
            const count = await tx.stockCount.create({
                data: {
                    number: dto.number ?? this.documentNumber("SC"),
                    warehouseId: dto.warehouseId,
                    status: "COMPLETED",
                    notes: dto.description,
                    userId: dto.userId,
                    completedAt: new Date(),
                    items: { create: {
                            productId: dto.productId, shelfId: dto.shelfId, systemQuantity,
                            countedQuantity: dto.countedQuantity, difference,
                        } },
                },
                include: { items: true },
            });
            const balance = await this.repository.setQuantity(tx, dto.productId, dto.warehouseId, dto.shelfId, dto.countedQuantity);
            const movement = await this.createMovement(tx, {
                type: "COUNT_CORRECTION", productId: dto.productId, sourceWarehouseId: dto.warehouseId,
                sourceShelfId: dto.shelfId, quantity: difference, userId: dto.userId,
                description: dto.description, referenceType: "STOCK_COUNT", referenceId: count.id,
            });
            if (difference !== 0) {
                await tx.notification.create({
                    data: {
                        type: "COUNT_DIFFERENCE",
                        title: "Sayım farkı oluştu",
                        message: `${count.number} numaralı sayımda ${difference} birim fark oluştu.`,
                        userId: dto.userId,
                    },
                });
            }
            return { count, balance, movement };
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        this.publish("stock.counted", result);
        return result;
    }
    async assertShelf(warehouseId, shelfId) {
        const shelf = await this.prisma.shelf.findFirst({ where: { id: shelfId, warehouseId, status: "ACTIVE" } });
        if (!shelf)
            throw new common_1.BadRequestException("Raf seçilen depoya ait değil veya pasif");
    }
    createMovement(tx, data) {
        return tx.stockMovement.create({ data });
    }
    publish(event, payload) {
        this.gateway.emit(event, payload);
        this.gateway.emit("stock.updated", payload);
    }
    documentNumber(prefix) {
        const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
        return `${prefix}-${date}-${(0, node_crypto_1.randomUUID)().slice(0, 6).toUpperCase()}`;
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_repository_1.InventoryRepository,
        inventory_gateway_1.InventoryGateway])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map