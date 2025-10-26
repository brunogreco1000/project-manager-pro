import { Controller, Post, Body, Res, Req, Get, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response, type Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { user, accessToken } = await this.authService.register(dto.username, dto.email, dto.password);
    res.cookie('sessionId', accessToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 24*60*60*1000 });
    return { user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.getJwt(req.user as any);
    res.cookie('sessionId', accessToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 24*60*60*1000 });
    return { user: req.user };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.getJwt(req.user as any);
    res.cookie('sessionId', accessToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 24*60*60*1000 });
    res.redirect('http://localhost:3000/dashboard');
  }

  @Get('me')
  async me(@Req() req: Request) {
    const token = req.cookies['sessionId'];
    if (!token) return null;
    return this.authService.getUserFromToken(token);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('sessionId', { path: '/' });
    return { message: 'Logged out' };
  }

  // 🔹 NUEVAS RUTAS PARA OLVIDASTE TU CONTRASEÑA

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    if (!email) throw new BadRequestException('El email es obligatorio.');
    await this.authService.sendPasswordResetEmail(email);
    return { message: 'Si el correo existe, se ha enviado un enlace de recuperación.' };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const success = await this.authService.resetPassword(body.token, body.newPassword);
    if (!success) throw new BadRequestException('Token inválido o expirado.');
    return { message: 'Contraseña actualizada correctamente.' };
  }
}
