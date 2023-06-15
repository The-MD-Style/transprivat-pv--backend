import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  public async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  public async findUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();

    userEntity.name = createUserDto.name;
    userEntity.surname = createUserDto.surname;
    userEntity.email = createUserDto.email;
    userEntity.password = createUserDto.password;

    const user = this.userRepository.create(userEntity);

    return this.userRepository.save(user);
  }

  public async update(userId: string, token: { refreshToken: string | null }): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedUser = {
      ...existingUser,
      refreshToken: token.refreshToken,
    };

    return this.userRepository.save(updatedUser);
  }
}
