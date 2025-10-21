import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStocksTransactions1760379278520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO stock_transactions (quantity, id_user, id_stock, action) VALUES
      (100, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteA1'), 'I'),
      (80, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteB2'), 'I'),
      (120, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteC3'), 'I'),
      (200, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteD4'), 'I'),
      (90, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteE5'), 'I'),
      (150, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteF6'), 'I'),
      (110, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteG7'), 'I'),
      (95, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteH8'), 'I'),
      (75, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteI9'), 'I'),
      (60, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteJ10'), 'I'),
      (130, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteA2'), 'I'),
      (60, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteB3'), 'I'),
      (50, (SELECT id FROM users WHERE email = 'andre.silva@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteC4'), 'I'),
      (70, (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteD5'), 'I'),
      (85, (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), (SELECT id FROM stocks WHERE batch = 'LoteE6'), 'I');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM stock_transactions
      WHERE id_stock IN (
        SELECT id FROM stocks WHERE batch IN (
          'LoteA1', 'LoteB2', 'LoteC3', 'LoteD4', 'LoteE5',
          'LoteF6', 'LoteG7', 'LoteH8', 'LoteI9', 'LoteJ10',
          'LoteA2', 'LoteB3', 'LoteC4', 'LoteD5', 'LoteE6';
        )
      );
    `);
  }
}
