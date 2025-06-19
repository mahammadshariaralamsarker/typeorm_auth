import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'src/utils/hash.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }
    const hashed = await hashPassword(createUserDto.password);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashed,
    });
    return this.userRepository.save(newUser);
  }
  async login(loginUserData: LoginUserDto) {
    const { email, password } = loginUserData;

    const existingUser = await this.userRepository.findOne({ where: { email: email } });
    if (!existingUser) {
      throw new BadRequestException('No User Found ')
    }
    const isMatch = await comparePassword(password, existingUser.password);

    if (isMatch) {
      const payload = {
        id: existingUser.id,
        email: existingUser.email
      }
      const token = await this.jwtService.signAsync(payload) 
      return {
        message: "user login successfull",
        token: token
      }
    }

  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const existing = await this.userRepository.findOne({ where: { id } });
    return { message: `This action returns a #${id} user`, existing };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
