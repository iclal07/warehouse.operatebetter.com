import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductQueryDto } from "./dto/product-query.dto";
import { ProductsService } from "./products.service";

@Controller({ path: "products", version: "1" })
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() query: ProductQueryDto) {
    return this.products.list(query);
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.products.detail(id);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }
}
