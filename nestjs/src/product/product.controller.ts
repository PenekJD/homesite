import { Controller, Get, Header, Post, Body, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';


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
  @Header("Content-Type", "application/json")
  @Header("Access-Control-Allow-Origin", "*")
  async getAll(): Promise<string> {
    let getData = await this.productService.findAll();
    return createResponse(getData);
  }

  @Get(':id')
  @Header("Content-Type", "application/json")
  @Header("Access-Control-Allow-Origin", "*")
  async findById( @Param('id') id:string ) {
    let getData = await this.productService.findById(id);
    return createResponse(getData);
  }

  @Post()
  @Header("Content-Type", "application/json")
  @Header("Access-Control-Allow-Origin", "*")
  async createProduct( @Body() product: CreateProductDto ): Promise<string> {
    let getData = await this.productService.create(product);
    return createResponse(getData);
  }

  @Delete()
  @Header("Content-Type", "application/json")
  @Header("Access-Control-Allow-Origin", "*")
  async deleteAll() {
    let getData = await this.productService.deleteAll();
    return createResponse(getData);
  }

}
