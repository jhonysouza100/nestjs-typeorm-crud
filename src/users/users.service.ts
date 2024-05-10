import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {

    const isExist = await this.usersRepository.findOneBy({id})

    if(!isExist) return new HttpException('NO_SUCH_USER', HttpStatus.NOT_FOUND)

    return isExist
  }

  async createOne(user: CreateUserDto) {

    const isExist = await this.usersRepository.findOneBy({username: user.username})

    if(isExist) return new HttpException('USER_ALREDY_EXISTS', HttpStatus.CONFLICT)

    const newUser = this.usersRepository.create(user)

    return await this.usersRepository.save(newUser)
  }
  
  async removeOne(id: number) {
    
    const isExist = await this.usersRepository.findOneBy({id})

    if(!isExist) return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)

    const result = await this.usersRepository.delete(id)

    return {...isExist, result};
  }

  async updateOne(id: number, user: UpdateUserDto) {

    const isExist = await this.usersRepository.findOneBy({id})

    if(!isExist) return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    
    const result = await this.usersRepository.update({id: id}, user);
    
    // const result = Object.assign(isExist, user);
    // return await this.usersRepository.save(result)

    return {...isExist, result} 
  }
}
