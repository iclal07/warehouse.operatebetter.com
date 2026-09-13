import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class ReceiveStockDto {
  @IsString() productId!: string;
  @IsString() warehouseId!: string;
  @IsString() shelfId!: string;
  @IsInt() @Min(1) quantity!: number;
  @IsOptional() @IsString() userId!: string;
  @IsOptional() @IsString() description?: string;
}

export class DispatchStockDto extends ReceiveStockDto {}

export class TransferStockDto {
  @IsString() productId!: string;
  @IsString() sourceWarehouseId!: string;
  @IsString() sourceShelfId!: string;
  @IsString() targetWarehouseId!: string;
  @IsString() targetShelfId!: string;
  @IsInt() @Min(1) quantity!: number;
  @IsOptional() @IsString() userId!: string;
  @IsOptional() @IsString() description?: string;
}

export class AdjustStockDto {
  @IsString() productId!: string;
  @IsString() warehouseId!: string;
  @IsString() shelfId!: string;
  @IsInt() @Min(0) countedQuantity!: number;
  @IsOptional() @IsString() userId!: string;
  @IsOptional() @IsString() description?: string;
}

export class ReceiptDocumentDto extends ReceiveStockDto {
  @IsOptional() @IsString() number?: string;
}

export class DispatchDocumentDto extends DispatchStockDto {
  @IsOptional() @IsString() number?: string;
}

export class TransferDocumentDto extends TransferStockDto {
  @IsOptional() @IsString() number?: string;
}

export class CountDocumentDto extends AdjustStockDto {
  @IsOptional() @IsString() number?: string;
}
