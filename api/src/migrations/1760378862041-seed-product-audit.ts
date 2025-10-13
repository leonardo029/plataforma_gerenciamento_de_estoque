import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProductAudit1760378862041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO product_audit (id_product, id_user, action, description)
      VALUES
        ((SELECT id FROM products WHERE identification_code = '7894092251423'), (SELECT id FROM users WHERE email = 'andre.silva@example.com'), 'C', 'Produto Arroz Tipo 1 5kg criado'),
        ((SELECT id FROM products WHERE identification_code = '7896419426549'), (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), 'C', 'Produto Feijão Carioca 1kg criado'),
        ((SELECT id FROM products WHERE identification_code = '7897199273618'), (SELECT id FROM users WHERE email = 'andre.silva@example.com'), 'C', 'Produto Macarrão Espaguete 500g criado'),
        ((SELECT id FROM products WHERE identification_code = '7895112997509'), (SELECT id FROM users WHERE email = 'fernanda.lima@example.com'), 'C', 'Produto Farinha de Trigo 1kg criado'),
        ((SELECT id FROM products WHERE identification_code = '7894418075650'), (SELECT id FROM users WHERE email = 'andre.silva@example.com'), 'C', 'Produto Mistura para Bolo Chocolate 400g criado'),
        ((SELECT id FROM products WHERE identification_code = '7896120953114'), (SELECT id FROM users WHERE email = 'andre.silva@example.com'), 'C', 'Produto Açúcar Refinado 1kg criado'),
        ((SELECT id FROM products WHERE identification_code = '7890688659102'), (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), 'C', 'Produto Óleo de Soja 900ml criado'),
        ((SELECT id FROM products WHERE identification_code = '7890139439074'), (SELECT id FROM users WHERE email = 'andre.silva@example.com'), 'C', 'Produto Margarina 500g criado'),
        ((SELECT id FROM products WHERE identification_code = '7899259973741'), (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), 'C', 'Produto Tempero Sazon Carnes 60g criado'),
        ((SELECT id FROM products WHERE identification_code = '7898862345877'), (SELECT id FROM users WHERE email = 'rafael.duarte@example.com'), 'C', 'Produto Extrato de Tomate 130g criado');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM product_audit
      WHERE id_product IN (
        SELECT id FROM products WHERE identification_code IN (
          '7894092251423',
          '7896419426549',
          '7897199273618',
          '7895112997509',
          '7894418075650',
          '7896120953114',
          '7890688659102',
          '7890139439074',
          '7899259973741',
          '7898862345877';
        )
      );
    `);
  }
}
