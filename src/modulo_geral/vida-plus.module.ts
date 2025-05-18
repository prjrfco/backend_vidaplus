import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PublicController } from './controllers/public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { UsuarioRepository } from './repositories/usuario.repository';
import { PacienteController } from './controllers/paciente.controller';
import { PacienteService } from './services/paciente.service';
import { PacienteRepository } from './repositories/paciente.repository';
import { PacienteEntity } from './entities/paciente.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, PacienteEntity]),
    PassportModule,
    JwtModule,
  ],
  controllers: [PublicController, PacienteController],
  providers: [AuthService, LocalStrategy, UsuarioRepository, PacienteRepository, PacienteService, ],
  exports: [AuthService],
})
export class VidaPlusModule {}
