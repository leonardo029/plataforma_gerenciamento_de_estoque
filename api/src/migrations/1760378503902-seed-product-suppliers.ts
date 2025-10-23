import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProductSuppliers1760378503902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO product_suppliers (id_supplier, id_product) VALUES
      (
        (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'),
        (SELECT id FROM products WHERE identification_code = '7894092251423')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Logística Beta S.A.'),
        (SELECT id FROM products WHERE identification_code = '7896419426549')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Importadora Gama Ltda'),
        (SELECT id FROM products WHERE identification_code = '7897199273618')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Comercial Delta'),
        (SELECT id FROM products WHERE identification_code = '7895112997509')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Atacado Épsilon Ltda'),
        (SELECT id FROM products WHERE identification_code = '7894418075650')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Soluções Zeta S.A.'),
        (SELECT id FROM products WHERE identification_code = '7896120953114')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Suprimentos Eta Ltda'),
        (SELECT id FROM products WHERE identification_code = '7890688659102')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'),
        (SELECT id FROM products WHERE identification_code = '7890139439074')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Logística Beta S.A.'),
        (SELECT id FROM products WHERE identification_code = '7899259973741')
      ),
      (
        (SELECT id FROM suppliers WHERE name = 'Comercial Delta'),
        (SELECT id FROM products WHERE identification_code = '7898862345877')
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM product_suppliers
      WHERE (id_supplier, id_product) IN (
        (
          (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'),
          (SELECT id FROM products WHERE identification_code = '7894092251423')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Logística Beta S.A.'),
          (SELECT id FROM products WHERE identification_code = '7896419426549')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Importadora Gama Ltda'),
          (SELECT id FROM products WHERE identification_code = '7897199273618')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Comercial Delta'),
          (SELECT id FROM products WHERE identification_code = '7895112997509')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Atacado Épsilon Ltda'),
          (SELECT id FROM products WHERE identification_code = '7894418075650')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Soluções Zeta S.A.'),
          (SELECT id FROM products WHERE identification_code = '7896120953114')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Suprimentos Eta Ltda'),
          (SELECT id FROM products WHERE identification_code = '7890688659102')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Distribuidora Alfa Ltda'),
          (SELECT id FROM products WHERE identification_code = '7890139439074')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Logística Beta S.A.'),
          (SELECT id FROM products WHERE identification_code = '7899259973741')
        ),
        (
          (SELECT id FROM suppliers WHERE name = 'Comercial Delta'),
          (SELECT id FROM products WHERE identification_code = '7898862345877')
        )
      );
    `);
  }
}
