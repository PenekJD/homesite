import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//For auth
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

interface IToken {
  token: string
}

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}



  async signUp(signUpDto: SignUpDto): Promise<IToken> {
    const { name, email, password } = signUpDto;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hashedPassword
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token }
  }



  async login(loginDto:LoginDto): Promise<IToken> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if(!user) { 
      throw new UnauthorizedException("Invalid user params..."); 
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedException("Incorrect password...");
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token }
  }



}
