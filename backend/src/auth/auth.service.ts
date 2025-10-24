import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string): Promise<AuthResponseDto> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ username, email, password: hashedPassword });
    await this.userRepository.save(user);

    const accessToken = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    };
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const accessToken = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    };
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }
}
