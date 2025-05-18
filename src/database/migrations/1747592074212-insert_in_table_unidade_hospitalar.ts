import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInTableUnidadeHospitalar1747592074212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO cadastro.unidade_hospitalar (id, nome, cep, estado, cidade, rua, bairro, numero, criado_em, atualizado_em, apagado_em) VALUES ('3925b1c5-8987-4ced-a50a-784199317db7', 'Hospital Israelita Albert Einstein', '69093-725', 'Amazonas', 'Manaus', 'Beco Itapemirim', 'Colônia Terra Nova', '20', '2025-05-18 18:50:25.812568', '2025-05-18 18:50:25.812568', null);
            INSERT INTO cadastro.unidade_hospitalar (id, nome, cep, estado, cidade, rua, bairro, numero, criado_em, atualizado_em, apagado_em) VALUES ('4355f711-f6a9-4f6d-923e-c9a11863e3b6', 'Hospital Sírio-Libanês', '69077-780', 'Amazonas', 'Manaus', 'Rua Catulo da Paixão', 'Japiim', '12', '2025-05-18 18:50:25.812568', '2025-05-18 18:50:25.812568', null);
            INSERT INTO cadastro.unidade_hospitalar (id, nome, cep, estado, cidade, rua, bairro, numero, criado_em, atualizado_em, apagado_em) VALUES ('cd407281-f493-45de-ab6c-6b4d621978ed', 'Hospital Moinhos de Vento', '69090-062', 'Amazonas', 'Manaus', 'Travessa Aspásia', 'Cidade Nova', '18', '2025-05-18 18:50:25.812568', '2025-05-18 18:50:25.812568', null);
            INSERT INTO cadastro.unidade_hospitalar (id, nome, cep, estado, cidade, rua, bairro, numero, criado_em, atualizado_em, apagado_em) VALUES ('04a9bb3c-fdbd-4f03-a64e-cd6bb1d6e25c', 'Hospital das Clínicas da USP', '59066-015', 'Rio Grande do Norte', 'Natal', 'Rua Professor Nazareno Aguiar', 'Candelária', '54', '2025-05-18 18:50:25.812568', '2025-05-18 18:50:25.812568', null);
            INSERT INTO cadastro.unidade_hospitalar (id, nome, cep, estado, cidade, rua, bairro, numero, criado_em, atualizado_em, apagado_em) VALUES ('955c7696-1e3d-413b-bf7d-a288f1396584', 'Hospital Santa Catarina Paulista', '59129-783', 'Rio Grande do Norte', 'Natal', 'Rua Marinho José da Costa', 'Lagoa Azul', '88', '2025-05-18 18:50:25.812568', '2025-05-18 18:50:25.812568', null);
            INSERT INTO cadastro.unidade_hospitalar (id, nome, cep, estado, cidade, rua, bairro, numero, criado_em, atualizado_em, apagado_em) VALUES ('0434206a-ecae-45a2-85d5-adc041293a47', 'Hospital Alemão Oswaldo Cruz', '59604-030', 'Rio Grande do Norte', 'Mossoró', 'Rua Romualdo Galvão', 'Lagoa do Mato', '21', '2025-05-18 18:50:25.812568', '2025-05-18 18:50:25.812568', null);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
