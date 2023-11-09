import { Injectable, Logger } from '@nestjs/common';
import { ProductRequest } from 'src/dto/product-request';
import { ProductResponse } from 'src/dto/product-response';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from 'src/repositories/product.repository';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly productRepository: ProductRepository) {}

  public async createProduct(payload: ProductRequest): Promise<void> {
    const product: Product = new Product();
    product.name = payload.name;
    product.description = payload.description;
    product.price = payload.price;

    const result = await this.productRepository.save(product);

    this.logger.log(`Product ${result.id} is saved`);
  }

  public async getAllProducts(): Promise<ProductResponse[]> {
    const products = await this.productRepository.find();
    return products.map(this.mapToProductResponse);
  }

  private mapToProductResponse(product: Product): ProductResponse {
    const productResposne = new ProductResponse();
    productResposne.id = product.id;
    productResposne.name = product.name;
    productResposne.description = product.description;
    productResposne.price = product.price;
    return productResposne;
  }
}
