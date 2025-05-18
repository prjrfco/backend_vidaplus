import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInTableEspecialidade1747592060662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('b11463b4-d36b-4145-8d89-64a756a01782', 'Cardiologia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('a391c19a-6651-490f-8058-8b5429a0a721', 'Clinico Geral', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('b824e03e-63ed-419a-a3cb-5d37ac6203ab', 'Pediatria', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('10715df2-839a-4e3e-a352-d9090f662d76', 'Obstetrícia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('f70aaba2-27f9-4917-96cd-5806ac1ba7bc', 'Cirurgia Geral', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('9171ff23-2eac-43d1-8db9-d142b8bad8a1', 'Anestesiologia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('97d5a558-a50a-457f-a41a-f8b816105296', 'Ortopedia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('6b1c2e4d-63e4-4e90-824b-f844411fe01a', 'Traumatologia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('364ccf2b-05f8-42c6-bbb6-8b01557d3daf', 'Neurologia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('ad5e9cd3-17d8-40ba-a475-35c7a311569d', 'Dermatologia', '2025-05-18 18:22:23.361649', null, null);
            INSERT INTO cadastro.especialidade (id, nome, criado_em, atualizado_em, apagado_em) VALUES ('e128ee0b-5ccb-415b-ad1f-c60d1d89f737', 'Psiquiatria', '2025-05-18 18:22:23.361649', null, null);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
