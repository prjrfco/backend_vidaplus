import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePaciente1747338687860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'paciente',
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
                  { name: 'nome', type: 'varchar', isNullable: false },
                  { name: 'telefone', type: 'varchar', isNullable: true },
                  { name: 'peso_kg', type: 'decimal', isNullable: true },
                  { name: 'altura_m', type: 'decimal', isNullable: true },
                  { name: 'tipo_sanguineo', type: 'varchar', isNullable: true },
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
                      name: "usuario_paciente_fk",
                      referencedSchema: "seguranca",
                      referencedTableName: "usuario",
                      referencedColumnNames: ["id"],
                      columnNames: ["usuario_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                  },
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('paciente', 'usuario_paciente_fk');
        await queryRunner.dropTable('paciente', true);
    }

}
