import { UnidadeHospitalarEntity } from '../entities/unidade-hospitalar.entity';

export class UnidadeHospitalarInfoDto {
  id: string;
  nome: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;

  constructor(entity: UnidadeHospitalarEntity) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.cep = entity.cep;
    this.estado = entity.estado;
    this.cidade = entity.cidade;
    this.bairro = entity.bairro;
    this.rua = entity.rua;
    this.numero = entity.numero;
  }
}
