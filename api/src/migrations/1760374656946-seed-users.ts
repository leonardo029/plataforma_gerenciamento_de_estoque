import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1760374656946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (name, email, password, id_address, id_contact, is_activated, role) VALUES
      ('André Carvalho Silva','andre.silva@example.com', '$2a$10$vqSOk9MH6sbd8aYbr7UQZefnlw2w.JEpLJO9kX2zHtebw9W3exPOe', (SELECT id FROM addresses WHERE cep = '01311000' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98877-1122' LIMIT 1), true, 'admin'),
      ('Fernanda Souza Lima','fernanda.lima@example.com', '$2a$10$vqSOk9MH6sbd8aYbr7UQZefnlw2w.JEpLJO9kX2zHtebw9W3exPOe', (SELECT id FROM addresses WHERE cep = '22041001' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '98765-4321' LIMIT 1), true, 'user'),
      ('Rafael Mendes Duarte','rafael.duarte@example.com', '$2a$10$vqSOk9MH6sbd8aYbr7UQZefnlw2w.JEpLJO9kX2zHtebw9W3exPOe', (SELECT id FROM addresses WHERE cep = '51020001' LIMIT 1), (SELECT id FROM contacts WHERE phone_number = '99654-3210' LIMIT 1), false, 'user');
    `);
  }
  //senha: teste123
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
