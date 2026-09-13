import { PaginationDto } from "../../../common/dto/pagination.dto";
export declare class ProductQueryDto extends PaginationDto {
    search?: string;
    categoryId?: string;
    warehouseId?: string;
    stockStatus?: "all" | "critical" | "out";
}
