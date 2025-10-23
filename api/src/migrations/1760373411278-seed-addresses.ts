import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAddresses1760373411278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO addresses (street, id_street_type, complement, cep, number, neighborhood, id_city) VALUES
      ('Paulista', (SELECT id FROM street_types WHERE name = 'Avenida'), null, '01311000', 1578, 'Bela Vista', 3550308),
      ('Copacabana', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 202', '22041001', 102, 'Copacabana', 3304557),
      ('Boa Viagem', (SELECT id FROM street_types WHERE name = 'Avenida'), null, '51020001', 500, 'Boa Viagem', 2611606),
      ('Afonso Pena', (SELECT id FROM street_types WHERE name = 'Avenida'), null, '30130000', 900, 'Centro', 3106200),
      ('Setor Bancário Sul', (SELECT id FROM street_types WHERE name = 'Setor'), 'Bloco A', '70070000', -1, 'Asa Sul', 5300108),
      ('Floriano Peixoto', (SELECT id FROM street_types WHERE name = 'Rua'), 'Sala 405', '80020090', 350, 'Centro', 4106902),
      ('Itaquera', (SELECT id FROM street_types WHERE name = 'Rua'), 'Bloco 3', '08215000', 450, 'Itaquera', 3550308),
      ('Leme', (SELECT id FROM street_types WHERE name = 'Rua'), null, '22010020', 88, 'Leme', 3304557),
      ('Boa Vista', (SELECT id FROM street_types WHERE name = 'Rua'), 'Fundos', '69020000', 120, 'Boa Vista', 1302603),
      ('Piedade', (SELECT id FROM street_types WHERE name = 'Rua'), null, '40270000', 780, 'Piedade', 2927408),
      ('Independência', (SELECT id FROM street_types WHERE name = 'Avenida'), null, '90035000', 250, 'Centro Histórico', 4314902),
      ('Rio Branco', (SELECT id FROM street_types WHERE name = 'Rua'), null, '69900000', 310, 'Centro', 1200401),
      ('José Paulino', (SELECT id FROM street_types WHERE name = 'Rua'), null, '13010021', 455, 'Centro', 3509502),
      ('João Pessoa', (SELECT id FROM street_types WHERE name = 'Rua'), 'Casa 5', '58010000', 601, 'Centro', 2507507),
      ('Goiás', (SELECT id FROM street_types WHERE name = 'Rua'), null, '74000000', 999, 'Setor Central', 5208707),
      ('Amazonas', (SELECT id FROM street_types WHERE name = 'Rua'), null, '69050000', 321, 'Adrianópolis', 1302603),
      ('Farol', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 303', '57021000', 320, 'Farol', 2704302),
      ('XV de Novembro', (SELECT id FROM street_types WHERE name = 'Rua'), null, '88015010', 120, 'Centro', 4205407),
      ('Das Flores', (SELECT id FROM street_types WHERE name = 'Jardim'), null, '69058000', 145, 'Flores', 1302603),
      ('Aeroporto', (SELECT id FROM street_types WHERE name = 'Aeroporto'), 'Loja 2', '29160000', -1, 'Aeroporto', 3205002),
      ('Do Comércio', (SELECT id FROM street_types WHERE name = 'Rua'), null, '40010000', 12, 'Comércio', 2927408),
      ('Itapoã', (SELECT id FROM street_types WHERE name = 'Rua'), 'Casa 4', '41741000', 40, 'Itapoã', 2927408),
      ('Cristiano Machado', (SELECT id FROM street_types WHERE name = 'Avenida'), null, '31170000', 600, 'Cidade Nova', 3106200),
      ('Rio Vermelho', (SELECT id FROM street_types WHERE name = 'Rua'), null, '41940000', 220, 'Rio Vermelho', 2927408),
      ('Barra', (SELECT id FROM street_types WHERE name = 'Rua'), null, '40140000', 112, 'Barra', 2927408),
      ('Pinheiros', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 1402', '05422010', 210, 'Pinheiros', 3550308),
      ('Aclimação', (SELECT id FROM street_types WHERE name = 'Rua'), 'Bloco B', '04110000', 77, 'Aclimação', 3550308),
      ('Águas Claras', (SELECT id FROM street_types WHERE name = 'Área'), null, '71900000', 920, 'Águas Claras', 5300108),
      ('Ceilândia', (SELECT id FROM street_types WHERE name = 'Rua'), 'Casa 7', '72210000', 310, 'Ceilândia', 5300108),
      ('Taguatinga', (SELECT id FROM street_types WHERE name = 'Rua'), 'Bloco B', '72110000', 120, 'Taguatinga', 5300108),
      ('Maracanã', (SELECT id FROM street_types WHERE name = 'Rua'), null, '20271130', 250, 'Maracanã', 3304557),
      ('Leblon', (SELECT id FROM street_types WHERE name = 'Rua'), null, '22430000', 800, 'Leblon', 3304557),
      ('Botafogo', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 1501', '22250040', 670, 'Botafogo', 3304557),
      ('Ipanema', (SELECT id FROM street_types WHERE name = 'Rua'), null, '22410030', 300, 'Ipanema', 3304557),
      ('Santa Cecília', (SELECT id FROM street_types WHERE name = 'Rua'), null, '01225000', 100, 'Santa Cecília', 3550308),
      ('Moema', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 1201', '04077001', 350, 'Moema', 3550308),
      ('Perdizes', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 902', '05014000', 250, 'Perdizes', 3550308),
      ('Santana', (SELECT id FROM street_types WHERE name = 'Rua'), null, '02012000', 900, 'Santana', 3550308),
      ('Vila Mariana', (SELECT id FROM street_types WHERE name = 'Rua'), null, '04117000', 450, 'Vila Mariana', 3550308),
      ('Jardim América', (SELECT id FROM street_types WHERE name = 'Jardim'), null, '01427001', 77, 'Jardim América', 3550308),
      ('Bela Cintra', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 301', '01415000', 225, 'Consolação', 3550308),
      ('Paulista', (SELECT id FROM street_types WHERE name = 'Avenida'), 'Sala 1102', '30120000', 680, 'Funcionários', 3106200),
      ('Centro', (SELECT id FROM street_types WHERE name = 'Rua'), null, '69901000', 12, 'Centro', 1200401),
      ('Mangabeiras', (SELECT id FROM street_types WHERE name = 'Rua'), null, '30315000', 99, 'Mangabeiras', 3106200),
      ('Pampulha', (SELECT id FROM street_types WHERE name = 'Rua'), 'Casa 9', '31275000', 401, 'Pampulha', 3106200),
      ('Cidade Nova', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 801', '31170090', 121, 'Cidade Nova', 3106200),
      ('Santa Efigênia', (SELECT id FROM street_types WHERE name = 'Rua'), null, '30130090', 234, 'Santa Efigênia', 3106200),
      ('Savassi', (SELECT id FROM street_types WHERE name = 'Rua'), null, '30140100', 505, 'Savassi', 3106200),
      ('Centro Cívico', (SELECT id FROM street_types WHERE name = 'Rua'), null, '80530000', 410, 'Centro Cívico', 4106902),
      ('Água Verde', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 601', '80240000', 601, 'Água Verde', 4106902),
      ('Batel', (SELECT id FROM street_types WHERE name = 'Rua'), 'Ap 2203', '80420090', 999, 'Batel', 4106902),
      ('Santa Felicidade', (SELECT id FROM street_types WHERE name = 'Rua'), 'Casa 12', '82015000', 89, 'Santa Felicidade', 4106902),
      ('Campo Comprido', (SELECT id FROM street_types WHERE name = 'Campo'), null, '81200000', 420, 'Campo Comprido', 4106902);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM addresses
      WHERE cep IN (
        '01311000', '22041001', '51020001', '30130000', '70070000', '80020090', '08215000',
        '22010020', '69020000', '40270000', '90035000', '69900000', '13010021', '58010000',
        '74000000', '69050000', '57021000', '88015010', '69058000', '29160000', '40010000',
        '41741000', '31170000', '41940000', '40140000', '05422010', '04110000', '71900000',
        '72210000', '72110000', '20271130', '22430000', '22250040', '22410030', '01225000',
        '04077001', '05014000', '02012000', '04117000', '01427001', '01415000', '30120000',
        '69901000', '30315000', '31275000', '31170090', '30130090', '30140100', '80530000',
        '80240000', '80420090', '82015000', '81200000'
      );
    `);
  }
}
