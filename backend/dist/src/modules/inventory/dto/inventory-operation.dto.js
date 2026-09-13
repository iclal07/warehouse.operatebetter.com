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
exports.CountDocumentDto = exports.TransferDocumentDto = exports.DispatchDocumentDto = exports.ReceiptDocumentDto = exports.AdjustStockDto = exports.TransferStockDto = exports.DispatchStockDto = exports.ReceiveStockDto = void 0;
const class_validator_1 = require("class-validator");
class ReceiveStockDto {
    productId;
    warehouseId;
    shelfId;
    quantity;
    userId;
    description;
}
exports.ReceiveStockDto = ReceiveStockDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveStockDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveStockDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveStockDto.prototype, "shelfId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReceiveStockDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveStockDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveStockDto.prototype, "description", void 0);
class DispatchStockDto extends ReceiveStockDto {
}
exports.DispatchStockDto = DispatchStockDto;
class TransferStockDto {
    productId;
    sourceWarehouseId;
    sourceShelfId;
    targetWarehouseId;
    targetShelfId;
    quantity;
    userId;
    description;
}
exports.TransferStockDto = TransferStockDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "sourceWarehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "sourceShelfId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "targetWarehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "targetShelfId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TransferStockDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferStockDto.prototype, "description", void 0);
class AdjustStockDto {
    productId;
    warehouseId;
    shelfId;
    countedQuantity;
    userId;
    description;
}
exports.AdjustStockDto = AdjustStockDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdjustStockDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdjustStockDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdjustStockDto.prototype, "shelfId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdjustStockDto.prototype, "countedQuantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdjustStockDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdjustStockDto.prototype, "description", void 0);
class ReceiptDocumentDto extends ReceiveStockDto {
    number;
}
exports.ReceiptDocumentDto = ReceiptDocumentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiptDocumentDto.prototype, "number", void 0);
class DispatchDocumentDto extends DispatchStockDto {
    number;
}
exports.DispatchDocumentDto = DispatchDocumentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DispatchDocumentDto.prototype, "number", void 0);
class TransferDocumentDto extends TransferStockDto {
    number;
}
exports.TransferDocumentDto = TransferDocumentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferDocumentDto.prototype, "number", void 0);
class CountDocumentDto extends AdjustStockDto {
    number;
}
exports.CountDocumentDto = CountDocumentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CountDocumentDto.prototype, "number", void 0);
//# sourceMappingURL=inventory-operation.dto.js.map