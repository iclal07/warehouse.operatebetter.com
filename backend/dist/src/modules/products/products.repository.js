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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ProductsRepository = class ProductsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPage(query) {
        const where = {
            categoryId: query.categoryId,
            balances: query.warehouseId ? { some: { warehouseId: query.warehouseId } } : undefined,
            OR: query.search ? [
                { name: { contains: query.search, mode: "insensitive" } },
                { sku: { contains: query.search, mode: "insensitive" } },
                { barcode: { contains: query.search, mode: "insensitive" } },
            ] : undefined,
        };
        const [items, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                include: { category: true, balances: true },
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.product.count({ where }),
        ]);
        return { items, total };
    }
    findById(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                balances: { include: { warehouse: true, shelf: true } },
                movements: { take: 20, orderBy: { createdAt: "desc" }, include: { user: true } },
            },
        });
    }
    create(data) {
        return this.prisma.product.create({ data, include: { category: true } });
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map