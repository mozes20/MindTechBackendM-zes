import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { RegistrationDto } from '../dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from '../dto/response.dto';
import process from "process";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const loginStatus = await this.validateUser(
      loginData.username,
      loginData.password,
    );
    const user = await this.userEntityRepository.findOneBy({ username: loginData.username });

    console.log(loginStatus);
    if (loginStatus) {
      const payload = { id: user.id,username: loginData.username };
      return new ResponseDto('Login Success', this.jwtService.sign(payload));
    }
    throw new HttpException('Login Failed', HttpStatus.NOT_FOUND);
  }

  async logout() {}

  async register(registerDto: RegistrationDto) {
    const saltOrRounds = 10;
    registerDto.password = await bcrypt.hash(
      registerDto.password,
      saltOrRounds,
    );
    // register logic
    await this.userEntityRepository.save(registerDto);
    this.userEntityRepository.create();
    return new ResponseDto('Registration Success', null);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userEntityRepository.findBy({
      username: username,
    });
    if (user.length === 0) {
      return false;
    }
    return await bcrypt.compare(password, user[0].password);
  }

  async getDataFromToken(token: string) {
    return this.jwtService.decode(token);
  }
}
