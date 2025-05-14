import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchemaSeguranca1632633866439
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS "seguranca";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('seguranca', true);
  }
}
