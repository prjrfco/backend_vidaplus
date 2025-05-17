import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProfissional1747338694565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'profissional',
              schema: 'cadastro',
              columns: [
                  {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'uuid',
                  },
                  { name: 'usuario_id', type: 'uuid', isNullable: false },
                  { name: 'unidade_hospitalar_id', type: 'uuid', isNullable: false },
                  { name: 'especialidade_id', type: 'uuid', isNullable: false },
                  { name: 'nome', type: 'varchar', isNullable: false },
                  { name: 'telefone', type: 'varchar', isNullable: true },
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
              foreignKeys: [
                  {
                      name: "usuario_profissional_fk",
                      referencedSchema: "seguranca",
                      referencedTableName: "usuario",
                      referencedColumnNames: ["id"],
                      columnNames: ["usuario_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
                  {
                      name: "unidade_hospitalar_profissional_fk",
                      referencedSchema: "cadastro",
                      referencedTableName: "unidade_hospitalar",
                      referencedColumnNames: ["id"],
                      columnNames: ["unidade_hospitalar_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
                  {
                      name: "especialidade_profissional_fk",
                      referencedSchema: "cadastro",
                      referencedTableName: "especialidade",
                      referencedColumnNames: ["id"],
                      columnNames: ["especialidade_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('profissional', 'especialidade_profissional_fk');
        await queryRunner.dropForeignKey('profissional', 'unidade_hospitalar_profissional_fk');
        await queryRunner.dropForeignKey('profissional', 'usuario_profissional_fk');
        await queryRunner.dropTable('profissional', true);
    }

}
