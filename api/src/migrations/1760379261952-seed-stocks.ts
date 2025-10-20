import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStocks1760379261952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO stocks (
        id_product,
        batch,
        expiration_date,
        cost_price,
        sale_price,
        id_supplier,
        stock_quantity,
        id_stock_location
      ) VALUES
      ((SELECT id FROM products WHERE identification_code = '7894092251423'), 'LoteA1', '2025-12-01', 10.50, 14.99, (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'), 100, (SELECT id FROM stock_locations LIMIT 1 OFFSET 0)),
      ((SELECT id FROM products WHERE identification_code = '7896419426549'), 'LoteB2', '2026-01-15', 8.40, 11.90, (SELECT id FROM suppliers WHERE name = 'Logística Beta S.A.'), 80, (SELECT id FROM stock_locations LIMIT 1 OFFSET 1)),
      ((SELECT id FROM products WHERE identification_code = '7897199273618'), 'LoteC3', '2025-11-30', 6.20, 9.49, (SELECT id FROM suppliers WHERE name = 'Importadora Gama Ltda'), 120, (SELECT id FROM stock_locations LIMIT 1 OFFSET 2)),
      ((SELECT id FROM products WHERE identification_code = '7895112997509'), 'LoteD4', '2026-02-10', 5.00, 7.99, (SELECT id FROM suppliers WHERE name = 'Comercial Delta'), 200, (SELECT id FROM stock_locations LIMIT 1 OFFSET 3)),
      ((SELECT id FROM products WHERE identification_code = '7894418075650'), 'LoteE5', '2026-03-05', 7.50, 10.99, (SELECT id FROM suppliers WHERE name = 'Atacado Épsilon Ltda'), 90, (SELECT id FROM stock_locations LIMIT 1 OFFSET 4)),
      ((SELECT id FROM products WHERE identification_code = '7896120953114'), 'LoteF6', '2026-04-01', 3.80, 6.49, (SELECT id FROM suppliers WHERE name = 'Soluções Zeta S.A.'), 150, (SELECT id FROM stock_locations LIMIT 1 OFFSET 5)),
      ((SELECT id FROM products WHERE identification_code = '7890688659102'), 'LoteG7', '2025-10-20', 4.50, 7.50, (SELECT id FROM suppliers WHERE name = 'Suprimentos Eta Ltda'), 110, (SELECT id FROM stock_locations LIMIT 1 OFFSET 6)),
      ((SELECT id FROM products WHERE identification_code = '7890139439074'), 'LoteH8', '2025-12-15', 6.30, 9.90, (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'), 95, (SELECT id FROM stock_locations LIMIT 1 OFFSET 7)),
      ((SELECT id FROM products WHERE identification_code = '7899259973741'), 'LoteI9', '2026-05-30', 2.10, 4.20, (SELECT id FROM suppliers WHERE name = 'Logística Beta S.A.'), 75, (SELECT id FROM stock_locations LIMIT 1 OFFSET 8)),
      ((SELECT id FROM products WHERE identification_code = '7898862345877'), 'LoteJ10', '2026-06-10', 3.00, 5.00, (SELECT id FROM suppliers WHERE name = 'Importadora Gama Ltda'), 60, (SELECT id FROM stock_locations LIMIT 1 OFFSET 9)),
      ((SELECT id FROM products WHERE identification_code = '7894092251423'), 'LoteA2', '2026-07-01', 10.75, 15.49, (SELECT id FROM suppliers WHERE name = 'Comercial Delta'), 130, (SELECT id FROM stock_locations LIMIT 1 OFFSET 10)),
      ((SELECT id FROM products WHERE identification_code = '7896419426549'), 'LoteB3', '2026-08-15', 8.20, 12.00, (SELECT id FROM suppliers WHERE name = 'Atacado Épsilon Ltda'), 60, (SELECT id FROM stock_locations LIMIT 1 OFFSET 11)),
      ((SELECT id FROM products WHERE identification_code = '7897199273618'), 'LoteC4', '2026-09-20', 6.50, 9.80, (SELECT id FROM suppliers WHERE name = 'Soluções Zeta S.A.'), 50, (SELECT id FROM stock_locations LIMIT 1 OFFSET 12)),
      ((SELECT id FROM products WHERE identification_code = '7895112997509'), 'LoteD5', '2026-10-30', 5.20, 8.00, (SELECT id FROM suppliers WHERE name = 'Suprimentos Eta Ltda'), 70, (SELECT id FROM stock_locations LIMIT 1 OFFSET 13)),
      ((SELECT id FROM products WHERE identification_code = '7894418075650'), 'LoteE6', '2026-11-25', 7.00, 10.50, (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'), 85, (SELECT id FROM stock_locations LIMIT 1 OFFSET 14));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM stocks
      WHERE batch IN (
        'LoteA1', 'LoteB2', 'LoteC3', 'LoteD4', 'LoteE5',
        'LoteF6', 'LoteG7', 'LoteH8', 'LoteI9', 'LoteJ10',
        'LoteA2', 'LoteB3', 'LoteC4', 'LoteD5', 'LoteE6';
      );
    `);
  }
}
