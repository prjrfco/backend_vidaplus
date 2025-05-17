import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUnidadeHospitalar1747338687861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'unidade_hospitalar',
              schema: 'cadastro',
              columns: [
                  {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'uuid',
                  },
                  { name: 'nome', type: 'varchar', isNullable: false },
                  { name: 'cep', type: 'varchar', isNullable: false },
                  { name: 'estado', type: 'varchar', isNullable: false },
                  { name: 'rua', type: 'varchar', isNullable: false },
                  { name: 'bairro', type: 'varchar', isNullable: false },
                  { name: 'numero', type: 'varchar', isNullable: false },
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
        await queryRunner.dropTable('unidade_hospitalar', true);
    }

}
