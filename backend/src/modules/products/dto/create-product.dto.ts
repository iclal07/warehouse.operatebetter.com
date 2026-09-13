import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString() name!: string;
  @IsString() sku!: string;
  @IsOptional() @IsString() barcode?: string;
  @IsString() categoryId!: string;
  @IsString() unit!: string;
  @IsInt() @Min(0) minimumStock!: number;
  @IsOptional() @IsString() description?: string;
}
