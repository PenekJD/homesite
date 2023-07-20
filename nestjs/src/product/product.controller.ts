import { Controller, Get, Post, Body, Delete, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';


const createResponse: (data:any) => string = (data:any) => {
  let feedback = {
    main: JSON.stringify(data)
  }
  return JSON.stringify(feedback);
}


@Controller('product') // string value = LINK in APP ( http://localhost:8888/product )
export class ProductController {

  constructor( private readonly productService: ProductService  ) {}

  @Get()
  async getAll( @Query() query: ExpressQuery ): Promise<string> {
    let getData = await this.productService.findAll(query);
    return createResponse(getData);
  }

  @Get(':id')
  async findById( @Param('id') id:string ) {
    let getData = await this.productService.findById(id);
    return createResponse(getData);
  }

  @Post()
  @UseGuards(AuthGuard()) //Проверка на авторизацию
  async createProduct( @Body() product: CreateProductDto ): Promise<string> {
    let getData = await this.productService.create(product);
    return createResponse(getData);
  }

  @Put(':id')
  async updateById( 
    @Param('id') id: string, 
    @Body() product: CreateProductDto
  ): Promise<string> {
    let getData = await this.productService.updateProduct(id, product);
    console.log(getData);
    return createResponse(getData);
  }

  @Delete()
  async deleteAll() {
    let getData = await this.productService.deleteAll();
    return createResponse(getData);
  }

}
