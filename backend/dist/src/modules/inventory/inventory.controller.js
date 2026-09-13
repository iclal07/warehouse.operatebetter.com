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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_operation_dto_1 = require("./dto/inventory-operation.dto");
const inventory_service_1 = require("./inventory.service");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let InventoryController = class InventoryController {
    inventory;
    constructor(inventory) {
        this.inventory = inventory;
    }
    list(warehouseId, shelfId, productId) {
        return this.inventory.list(warehouseId, shelfId, productId);
    }
    receive(dto, userId) {
        dto.userId = userId;
        return this.inventory.receiveStock(dto);
    }
    dispatch(dto, userId) {
        dto.userId = userId;
        return this.inventory.dispatchStock(dto);
    }
    transfer(dto, userId) {
        dto.userId = userId;
        return this.inventory.transferStock(dto);
    }
    adjust(dto, userId) {
        dto.userId = userId;
        return this.inventory.adjustStock(dto);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("warehouseId")),
    __param(1, (0, common_1.Query)("shelfId")),
    __param(2, (0, common_1.Query)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "list", null);
__decorate([
    (0, common_1.Post)("receive"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.ReceiveStockDto, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "receive", null);
__decorate([
    (0, common_1.Post)("dispatch"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.DispatchStockDto, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "dispatch", null);
__decorate([
    (0, common_1.Post)("transfer"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.TransferStockDto, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "transfer", null);
__decorate([
    (0, common_1.Post)("adjust"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.AdjustStockDto, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "adjust", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)({ path: "stock", version: "1" }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map