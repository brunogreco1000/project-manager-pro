import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { AuthResponseDto } from './dto/auth-response.dto';
import { v4 as uuid } from 'uuid';
import * as nodemailer from 'nodemailer';

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

    const accessToken = await this.getJwt(user);

    return {
      user: { id: user.id, username: user.username, email: user.email },
      accessToken,
    };
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const accessToken = await this.getJwt(user);

    return {
      user: { id: user.id, username: user.username, email: user.email },
      accessToken,
    };
  }

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) return null;
      return { id: user.id, username: user.username, email: user.email };
    } catch {
      return null;
    }
  }

  async getJwt(user: User): Promise<string> {
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }

  async validateOAuthLogin(profile: any) {
    let user = await this.userRepository.findOne({ where: { email: profile.emails[0].value } });
    if (!user) {
      user = this.userRepository.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        password: '', 
      });
      await this.userRepository.save(user);
    }
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    return user;
  }

  // 🔹 NUEVOS MÉTODOS PARA OLVIDASTE TU CONTRASEÑA

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return;

    const token = uuid();
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15);

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await this.userRepository.save(user);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Soporte" <no-reply@tuapp.com>',
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { resetToken: token } });
    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return false;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await this.userRepository.save(user);

    return true;
  }
}
