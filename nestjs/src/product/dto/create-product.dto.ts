import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsOptional() 
  @IsString()
  readonly desc: string

  @IsNotEmpty()
  @IsNumber()
  readonly ser: number

  //Also you can use IsEnum if you want recive complex data as object
  //EXAMPLE:
  /* 
    @IsNotEmpty()
    @IsEnum(SomeClass, { message: 'Message if 400 error' })
    readonly someObject: SomeClass
  */
}