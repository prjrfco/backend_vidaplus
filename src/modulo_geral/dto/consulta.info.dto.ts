import { TipoConsultaEnum } from '../../common/enums/tipo.consulta.enum';
import { ProfissionalInfoDto } from './profissional.info.dto';
import { PacienteInfoDto } from './paciente.info.dto';
import { UnidadeHospitalarInfoDto } from './unidade-hospitalar.info.dto';
import { ConsultaEntity } from '../entities/consulta.entity';

export class ConsultaInfoDto {
  id: string;
  dataMarcada: Date;
  realizada: boolean;
  cancelada: boolean;
  tipo: TipoConsultaEnum;
  observacoes: string;
  profissional: ProfissionalInfoDto;
  paciente: PacienteInfoDto;
  unidadeHospitalar: UnidadeHospitalarInfoDto;
  criadaEm: Date;
  atualizadaEm: Date;

  constructor(entity: ConsultaEntity) {
    this.id = entity.id;
    this.dataMarcada = entity.dataHoraMarcada;
    this.realizada = entity.realizada;
    this.cancelada = entity.cancelada;
    this.tipo = entity.tipo;
    this.observacoes = entity.observacoes;
    this.profissional = new ProfissionalInfoDto(entity.profissional);
    this.paciente = new PacienteInfoDto(entity.paciente);
    this.unidadeHospitalar = new UnidadeHospitalarInfoDto(entity.unidadeHospitalar);
    this.criadaEm = entity.criadoEm;
    this.atualizadaEm = entity.atualizadoEm;
  }
}
