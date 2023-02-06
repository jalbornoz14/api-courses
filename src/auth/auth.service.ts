import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      sub: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginBackoffice(user: any) {
    if (user.profile.name !== 'Administrador') {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      sub: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
