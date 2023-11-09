import { randomUUID } from 'crypto';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 't_products' })
export class Product {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @ObjectIdColumn({ name: 'id' })
  private _id: string = randomUUID();
}
