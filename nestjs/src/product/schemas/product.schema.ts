import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

export const ProductSchema = SchemaFactory.createForClass(Product);