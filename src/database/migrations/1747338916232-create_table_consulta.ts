import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableConsulta1747338916232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'consulta',
              schema: 'cadastro',
              columns: [
                  {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'uuid',
                  },
                  { name: 'paciente_id', type: 'uuid', isNullable: false },
                  { name: 'profissional_id', type: 'uuid', isNullable: false },
                  { name: 'unidade_hospitalar_id', type: 'uuid', isNullable: false },
                  { name: 'data_marcada', type: 'timestamp', isNullable: false },
                  { name: 'realizada', type: 'boolean', isNullable: false, default: false },
                  { name: 'cancelada', type: 'boolean', isNullable: false, default: false },
                  { name: 'tipo', type: 'varchar', isNullable: false, default: "'PRESENCIAL'" },
                  { name: 'observacoes', type: 'text', isNullable: true },
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
                      name: "paciente_consulta_fk",
                      referencedSchema: "cadastro",
                      referencedTableName: "paciente",
                      referencedColumnNames: ["id"],
                      columnNames: ["paciente_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
                  {
                      name: "profissional_consulta_fk",
                      referencedSchema: "cadastro",
                      referencedTableName: "profissional",
                      referencedColumnNames: ["id"],
                      columnNames: ["profissional_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
                  {
                      name: "unidade_hospitalar_consulta_fk",
                      referencedSchema: "cadastro",
                      referencedTableName: "unidade_hospitalar",
                      referencedColumnNames: ["id"],
                      columnNames: ["unidade_hospitalar_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('consulta', 'unidade_hospitalar_consulta_fk');
        await queryRunner.dropForeignKey('consulta', 'profissional_consulta_fk');
        await queryRunner.dropForeignKey('consulta', 'paciente_consulta_fk');
        await queryRunner.dropTable('consulta');
    }

}
