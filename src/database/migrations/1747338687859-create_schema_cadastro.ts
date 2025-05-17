import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchemaCadastro1747338687859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS "cadastro";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema('cadastro', true);
    }
}
