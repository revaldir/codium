import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Fetch user with given email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Not found exception
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Match password via hash compare
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Exception not matched password
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Generate JWT containing user's ID and returns it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
