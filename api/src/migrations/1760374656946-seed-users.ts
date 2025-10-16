import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1760374656946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (name, email, password, id_address, id_contact, is_activated) VALUES
      ('André Carvalho Silva','andre.silva@example.com', '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee6841f5c1d2d4c4e1f2d3e6a7a7b', (SELECT id FROM addresses WHERE cep = '01311000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98877-1122' LIMIT 1), true),
      ('Fernanda Souza Lima','fernanda.lima@example.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', (SELECT id FROM addresses WHERE cep = '22041001' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98765-4321' LIMIT 1), true),
      ('Rafael Mendes Duarte','rafael.duarte@example.com', '6cf615d5bcaac778352a8f1f3360d23d3c9d4b2a44f9c2f1819f91c2e0d7d3b2', (SELECT id FROM addresses WHERE cep = '51020001' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '99654-3210' LIMIT 1), false);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM users WHERE email IN (
    'andre.silva@example.com',
    'fernanda.lima@example.com',
    'rafael.duarte@example.com'
    );
  `);
  }
}
