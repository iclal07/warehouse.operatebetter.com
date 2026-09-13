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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const [products, balances, movements, warehouses, receipts, dispatches] = await Promise.all([
            this.prisma.product.findMany({ where: { status: "ACTIVE" }, include: { balances: true } }),
            this.prisma.stockBalance.aggregate({ _sum: { quantity: true } }),
            this.prisma.stockMovement.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                include: {
                    product: true, user: true, sourceWarehouse: true, sourceShelf: true,
                    targetWarehouse: true, targetShelf: true,
                },
            }),
            this.prisma.warehouse.findMany({ include: { shelves: { include: { balances: true } } } }),
            this.prisma.stockMovement.aggregate({
                where: { type: "IN", createdAt: { gte: startOfDay } },
                _sum: { quantity: true },
            }),
            this.prisma.stockMovement.aggregate({
                where: { type: "OUT", createdAt: { gte: startOfDay } },
                _sum: { quantity: true },
            }),
        ]);
        const criticalProducts = products
            .map(product => ({
            ...product,
            totalStock: product.balances.reduce((sum, balance) => sum + balance.quantity, 0),
        }))
            .filter(product => product.totalStock <= product.minimumStock);
        return {
            metrics: {
                totalProducts: products.length,
                totalStock: balances._sum.quantity ?? 0,
                criticalStock: criticalProducts.length,
                todayReceived: receipts._sum.quantity ?? 0,
                todayDispatched: dispatches._sum.quantity ?? 0,
            },
            criticalProducts: criticalProducts.slice(0, 6),
            recentMovements: movements,
            warehouseOccupancy: warehouses.map(warehouse => {
                const used = warehouse.shelves.reduce((sum, shelf) => sum + shelf.balances.reduce((shelfSum, balance) => shelfSum + balance.quantity, 0), 0);
                return {
                    id: warehouse.id,
                    name: warehouse.name,
                    capacity: warehouse.capacity,
                    used,
                    rate: warehouse.capacity ? Math.round((used / warehouse.capacity) * 100) : 0,
                };
            }),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map