import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { AuthDto } from "./dto/auth.dto";

import { ITokens } from "./models/accesToken.model";

import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserEntity } from "../user/entities/user.entity";


@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signUp(createUserDto: CreateUserDto): Promise<ITokens> {
    // Check if user exists
    const userExists = await this.usersService.findUserByEmail(createUserDto.email);

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(data: AuthDto): Promise<ITokens> {
    const user = await this.usersService.findUserByEmail(data.email);

    if (!user) throw new BadRequestException("User does not exist");

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) throw new BadRequestException("Password is incorrect");

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId = ""): Promise<UserEntity> {
    return this.usersService.update(userId, { refreshToken: null });
  }

  private async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, username: string): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: "15m",
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: "7d",
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<ITokens> {
    const user = await this.usersService.findUserById(userId);

    if (!user?.refreshToken) throw new ForbiddenException("Access Denied");

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
