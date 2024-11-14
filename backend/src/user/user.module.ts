import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule], // Importa o módulo onde PrismaService está definido
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
