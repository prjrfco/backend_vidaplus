import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: 'criado_em', nullable: false, type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', nullable: true, type: 'timestamp' })
  atualizadoEm: Date;

  @DeleteDateColumn({ name: 'apagado_em', nullable: true, type: 'timestamp' })
  apagadoEm: Date;
}
