import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

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

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: User

  //Also you can use IsEnum if you want recive complex data as object
  //EXAMPLE:
  /* 
    @IsNotEmpty()
    @IsEnum(SomeClass, { message: 'Message if 400 error' })
    readonly someObject: SomeClass
  */
}