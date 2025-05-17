import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableEspecialidade1747338687862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'especialidade',
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
        await queryRunner.dropTable('especialidade', true);
    }

}
