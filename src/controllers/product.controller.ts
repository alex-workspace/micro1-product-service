import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRequest } from 'src/dto/product-request';
import { ProductResponse } from 'src/dto/product-response';
import { ProductService } from 'src/services/product.service';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async postCreateProduct(@Body() payload: ProductRequest): Promise<void> {
    await this.productService.createProduct(payload);
  }

  @Get()
  async getAllProducts(): Promise<ProductResponse[]> {
    return this.productService.getAllProducts();
  }
}
