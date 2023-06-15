import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

import { ITokens } from "./models/accesToken.model";
import { CreateUserDto } from "../user/dto/create-user.dto";

import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { AccessTokenGuard } from "src/guards/accessToken.guard";


@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  public async signup(@Body() createUserDto: CreateUserDto): Promise<ITokens> {
    return this.authService.signUp(createUserDto);
  }

  @ApiBody({ type: AuthDto })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() data: AuthDto): Promise<ITokens> {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Get("refresh")
  refreshTokens(@Req() req: Request): Promise<ITokens> {
    const userId = req.user.sub;

    const refreshToken = req.user.refreshToken;

    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get("logout")
  logout(@Req() req: Request): void {
    const userId = req.user.sub;

    void this.authService.logout(userId);
  }
}
