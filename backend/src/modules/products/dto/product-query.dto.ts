import { IsIn, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../common/dto/pagination.dto";

export class ProductQueryDto extends PaginationDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsString() warehouseId?: string;
  @IsOptional() @IsIn(["all", "critical", "out"]) stockStatus?: "all" | "critical" | "out";
}
