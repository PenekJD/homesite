import { Injectable } from '@nestjs/common';

let MongoDbUri: string = process.env.MONGODB_URI || 'no :(';
let JWT_sec: string = process.env.JWT_SECRET || 'no :(';
let JWT_exp: string = process.env.JWT_EXPIRE || 'NOO';

@Injectable()
export class AppService {

  getHello(): string {
    let resp = {
      main: `${MongoDbUri} --- ${JWT_sec} --- ${JWT_exp}`
    }
    return JSON.stringify(resp);
  }
  
}
