import {Module} from "@nestjs/common";
import {AuthService} from "./services/auth.service";
import {SegurancaController} from "./controllers/seguranca.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./entities/usuario.entity";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./local.auth";
import {UsuarioRepository} from "./repositories/usuario.repository";
import { PacienteController } from './controllers/paciente.controller';
import { UsuarioService } from './services/usuario.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    PassportModule,
    JwtModule,
  ],
  controllers: [SegurancaController, PacienteController],
  providers: [AuthService, LocalStrategy, UsuarioRepository, UsuarioService],
  exports: [AuthService],
})
export class SegurancaModule {}
