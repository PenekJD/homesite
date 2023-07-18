import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ){}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async create(product: Product): Promise<Product> {
    const feedback = await this.productModel.create(product);
    return feedback;
  }

  async deleteAll() : Promise<string> {
    await this.productModel.deleteMany();
    return "Deleted";
  }

  async findById(id: string) : Promise<Product> {
    return await this.productModel.findOne({ _id: id });
  }
  
}
