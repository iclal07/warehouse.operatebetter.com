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
exports.WarehousesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let WarehousesService = class WarehousesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() {
        return this.prisma.warehouse.findMany({
            include: { _count: { select: { shelves: true, balances: true } } },
            orderBy: { name: "asc" },
        });
    }
    async detail(id) {
        const warehouse = await this.prisma.warehouse.findUnique({
            where: { id },
            include: {
                shelves: { include: { balances: true }, orderBy: { code: "asc" } },
                balances: { include: { product: true, shelf: true } },
                sourceMoves: { take: 20, orderBy: { createdAt: "desc" }, include: { product: true, user: true } },
            },
        });
        if (!warehouse)
            throw new common_1.NotFoundException("Depo bulunamadı");
        const stock = warehouse.balances.reduce((sum, item) => sum + item.quantity, 0);
        const usedCapacity = warehouse.shelves.reduce((sum, shelf) => sum + shelf.balances.reduce((shelfSum, balance) => shelfSum + balance.quantity, 0), 0);
        return {
            ...warehouse,
            stock,
            occupancyRate: warehouse.capacity ? Math.round((usedCapacity / warehouse.capacity) * 100) : 0,
        };
    }
};
exports.WarehousesService = WarehousesService;
exports.WarehousesService = WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarehousesService);
//# sourceMappingURL=warehouses.service.js.map