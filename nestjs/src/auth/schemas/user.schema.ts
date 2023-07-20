import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
export class User extends Document {

  @Prop() readonly name:string

  @Prop( { unique: [true, 'This email already exist in database'] } ) 
  readonly email:string

  @Prop() readonly password:string

}

export const UserSchema = SchemaFactory.createForClass(User);