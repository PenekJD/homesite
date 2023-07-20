import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>
  ){}

  async findAll(query: Query): Promise<Product[]> {

    //We recive values by query: p and search
    // p - current page
    // search - search by title

    const perPage = 10;
    const curPage = Number(query.p) || 1;
    const skip = perPage*(curPage-1);

    const search = query.search ? {
      $or: [
        {
          title: {
            $regex: query.search,
            $options: 'i'
          }
        },
        {
          desc: {
            $regex: query.search,
            $options: 'i'
          }
        }
      ]
    } : {};

    const products = await this.productModel
      .find({...search})
      .limit(perPage)
      .skip(skip)
      .sort({"createdAt":-1});
    return products;

  }

  async create(product: Product, user: User): Promise<Product> {
    const productToDb = Object.assign(product, { user: user._id });
    const feedback = await this.productModel.create(productToDb);
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
