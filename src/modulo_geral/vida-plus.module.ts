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
import { PacienteConsultaController } from './controllers/paciente-consulta.controller';
import { ProfissionalEntity } from './entities/profissional.entity';
import { ConsultaService } from './services/consulta.service';
import { ConsultaRepository } from './repositories/consulta.repository';
import { ProfissionalRepository } from './repositories/profissional.repository';
import { ConsultaEntity } from './entities/consulta.entity';
import { ProfissionalConsultaController } from './controllers/profissional-consulta.controller';
import { DropdownController } from './controllers/dropdown.controller';
import { DropdownService } from './services/dropdown.service';
import { UnidadeHospitalarRepository } from './repositories/unidade-hospitalar.repository';
import { UnidadeHospitalarEntity } from './entities/unidade-hospitalar.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity,
      PacienteEntity,
      ConsultaEntity,
      ProfissionalEntity,
      UnidadeHospitalarEntity]),
    PassportModule,
    JwtModule,
  ],
  controllers: [PublicController,
    PacienteController,
    PacienteConsultaController,
    ProfissionalConsultaController,
    DropdownController],
  providers: [AuthService,
    LocalStrategy,
    UsuarioRepository,
    PacienteRepository,
    PacienteService,
    ConsultaService,
    ConsultaRepository,
    ProfissionalRepository,
    DropdownService,
    UnidadeHospitalarRepository],
  exports: [AuthService],
})
export class VidaPlusModule {}
