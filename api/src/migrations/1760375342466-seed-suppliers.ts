import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSuppliers1760375342466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO suppliers (name, email, id_address, id_contact) VALUES
      ('Distribuidora Alfa Ltda', 'contato@distribuidoraalfa.com.br', (SELECT id FROM addresses WHERE cep = '30130000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '99443-2211' LIMIT 1)),
      ('Logística Beta S.A.', 'suporte@logisticabeta.com.br', (SELECT id FROM addresses WHERE cep = '70070000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '99123-4567' LIMIT 1)),
      ('Importadora Gama Ltda', 'vendas@importadoragama.com.br', (SELECT id FROM addresses WHERE cep = '80020090' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98989-8989' LIMIT 1)),
      ('Comercial Delta', 'comercial@comercialdelta.com.br', (SELECT id FROM addresses WHERE cep = '08215000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '99777-7777' LIMIT 1)),
      ('Atacado Épsilon Ltda', 'contato@atacadoepsilon.com.br', (SELECT id FROM addresses WHERE cep = '22010020' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '99333-4444' LIMIT 1)),
      ('Soluções Zeta S.A.', 'suporte@solucoeszeta.com.br', (SELECT id FROM addresses WHERE cep = '69020000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98666-5555' LIMIT 1)),
      ('Suprimentos Eta Ltda', 'vendas@suprimentoseita.com.br', (SELECT id FROM addresses WHERE cep = '40270000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98555-6666' LIMIT 1));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM suppliers WHERE email IN (
    'contato@distribuidoraalfa.com.br',
    'suporte@logisticabeta.com.br',
    'vendas@importadoragama.com.br',
    'comercial@comercialdelta.com.br',
    'contato@atacadoepsilon.com.br',
    'suporte@solucoeszeta.com.br',
    'vendas@suprimentoseita.com.br';
    );
  `);
  }
}
