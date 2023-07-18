import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ){}

  async findAll(query: Query): Promise<Product[]> {
    const search = query.search ? {
      title: {
        $regex: query.search,
        $options: 'i'
      }
    } : {};
    const products = await this.productModel.find({...search});
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
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new NotFoundException('Not found');
    }
    return product;
  }

  async updateProduct(id:string, product:Product):Promise<Product> {
     await this.productModel.updateOne( {_id:id}, product);
     return product;
  }
  
}
