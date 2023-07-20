import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

const MongoDbUri: string = process.env.MONGODB_URI || '';

@Module({
  imports: [
    MongooseModule.forRoot(MongoDbUri),
    ProductModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
