import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductService } from 'src/services/product.service';
import { ProductController } from 'src/controllers/product.controller';

describe('ProductService (e2e)', () => {
  let app: INestApplication;
  let productRepository: ProductRepository;
  let mongodbContainer: StartedMongoDBContainer;

  beforeAll(async () => {
    mongodbContainer = await new MongoDBContainer('mongo:6.0.1').start();

    const url = mongodbContainer.getConnectionString();

    const appModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          directConnection: true,
          type: 'mongodb',
          url,
          database: 'order-service',
          entities: [Product],
        }),
      ],
      controllers: [ProductController],
      providers: [ProductService, ProductRepository],
    }).compile();

    productRepository = appModule.get<ProductRepository>(ProductRepository);

    app = appModule.createNestApplication();

    await app.init();
  }, 70000);

  afterAll(async () => {
    await app.close();
    await mongodbContainer.stop();
  });

  it('/api/product (POST) ', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/product')
      .send({ name: 'iPhone 15 KW', description: 'iPhone', price: 99.99 });

    const productInDb = await productRepository.find();
    expect(response.status).toBe(201);
    expect(productInDb.length).toEqual(1);
  });

  it('/api/product (GET) ', async () => {
    const response = await request(app.getHttpServer()).get('/api/product');

    expect(response.status).toBe(200);
  });
});
