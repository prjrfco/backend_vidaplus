import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsuario1732627076539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario',
        schema: 'seguranca',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'cpf', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isNullable: false },
          { name: 'senha', type: 'varchar', isNullable: false },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'atualizado_em',
            type: 'timestamp',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'apagado_em',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuario');
  }
}
