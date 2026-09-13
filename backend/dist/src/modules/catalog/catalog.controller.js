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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = exports.SearchController = exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let CategoriesController = class CategoriesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() { return this.prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { name: "asc" } }); }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "list", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)({ path: "categories", version: "1" }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesController);
let SearchController = class SearchController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(query = "") {
        const q = query.trim();
        if (q.length < 2)
            return { products: [], warehouses: [], shelves: [] };
        const [products, warehouses, shelves] = await Promise.all([
            this.prisma.product.findMany({
                where: { OR: [
                        { name: { contains: q, mode: "insensitive" } },
                        { sku: { contains: q, mode: "insensitive" } },
                        { barcode: { contains: q, mode: "insensitive" } },
                    ] },
                take: 10,
            }),
            this.prisma.warehouse.findMany({
                where: { OR: [
                        { name: { contains: q, mode: "insensitive" } },
                        { code: { contains: q, mode: "insensitive" } },
                    ] },
                take: 10,
            }),
            this.prisma.shelf.findMany({
                where: { code: { contains: q, mode: "insensitive" } },
                include: { warehouse: true },
                take: 10,
            }),
        ]);
        return { products, warehouses, shelves };
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "search", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)({ path: "search", version: "1" }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchController);
let NotificationsController = class NotificationsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 50,
        });
    }
    markRead(id, userId) {
        return this.prisma.notification.updateMany({ where: { id, userId }, data: { readAt: new Date() } });
    }
    markAllRead(userId) {
        return this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(":id/read"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markRead", null);
__decorate([
    (0, common_1.Patch)("read-all"),
    __param(0, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAllRead", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)({ path: "notifications", version: "1" }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsController);
//# sourceMappingURL=catalog.controller.js.map