import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
  timestamps: true
})
export class Product {
  @Prop()
  title: string;
  @Prop()
  desc: string;
  @Prop()
  ser: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);