import { Injectable, NotFoundException } from "@nestjs/common";
import { paginationMeta } from "../../common/dto/pagination.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductQueryDto } from "./dto/product-query.dto";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  async list(query: ProductQueryDto) {
    const result = await this.repository.findPage(query);
    const mapped = result.items.map(product => {
      const totalStock = product.balances.reduce((sum, balance) => sum + balance.quantity, 0);
      return { ...product, balances: undefined, totalStock, isCritical: totalStock <= product.minimumStock };
    }).filter(product =>
      !query.stockStatus || query.stockStatus === "all" ||
      (query.stockStatus === "out" ? product.totalStock === 0 : product.isCritical),
    );
    return { data: mapped, meta: paginationMeta(result.total, query.page, query.limit) };
  }

  async detail(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException("Ürün bulunamadı");
    return {
      ...product,
      totalStock: product.balances.reduce((sum, balance) => sum + balance.quantity, 0),
    };
  }

  create(dto: CreateProductDto) {
    return this.repository.create(dto);
  }
}
