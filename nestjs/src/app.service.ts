import { Injectable } from '@nestjs/common';

let MongoDbUri: string = process.env.MONGODB_URI || 'no :(';

@Injectable()
export class AppService {

  getHello(): string {
    let resp = {
      main: `${MongoDbUri}`
    }
    return JSON.stringify(resp);
  }
  
}
