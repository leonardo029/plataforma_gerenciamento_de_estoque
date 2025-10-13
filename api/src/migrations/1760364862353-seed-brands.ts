import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedBrands1760364862353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO brands (name) VALUES
      ('Coca-Cola'),
      ('Ypê'),
      ('Colgate'),
      ('Omo'),
      ('Qualy'),
      ('Maggi'),
      ('Soya'),
      ('Vitarella'),
      ('Nescau'),
      ('Miojo'),
      ('Fanta'),
      ('Sorriso'),
      ('Palmolive'),
      ('Italac'),
      ('Knorr'),
      ('Quero'),
      ('Piracanjuba'),
      ('Bombril'),
      ('Sazon'),
      ('Nestlé'),
      ('Maratá'),
      ('Minuano'),
      ('Lux'),
      ('Liza'),
      ('Elegê'),
      ('Seda'),
      ('Bauducco'),
      ('Hellmanns'),
      ('Ninho'),
      ('Panco'),
      ('Schin'),
      ('Vigor'),
      ('Rexona'),
      ('Arisco'),
      ('Personal'),
      ('Camponesa'),
      ('Dove'),
      ('Mabel'),
      ('Tixan'),
      ('Club Social'),
      ('Veja'),
      ('Piraquê'),
      ('Limpol'),
      ('Marilan'),
      ('Tirol'),
      ('Santa Clara'),
      ('Santa Amália'),
      ('Perdigão'),
      ('Sadia'),
      ('Seara'),
      ('Cristal'),
      ('Pepsi'),
      ('Dona Benta'),
      ('Kibon'),
      ('Aurora');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM brands
      WHERE name IN (
        'Coca-Cola', 'Ypê', 'Colgate', 'Omo', 'Qualy', 'Maggi', 'Soya', 'Vitarella', 'Nescau',
        'Miojo', 'Fanta', 'Sorriso', 'Palmolive', 'Italac', 'Knorr', 'Quero', 'Piracanjuba',
        'Bombril', 'Sazon', 'Nestlé', 'Maratá', 'Minuano', 'Lux', 'Liza', 'Elegê', 'Seda',
        'Bauducco', 'Hellmanns', 'Ninho', 'Panco', 'Schin', 'Vigor', 'Rexona', 'Arisco',
        'Personal', 'Camponesa', 'Dove', 'Mabel', 'Tixan', 'Club Social', 'Veja', 'Piraquê',
        'Limpol', 'Marilan', 'Tirol', 'Santa Clara', 'Santa Amália', 'Perdigão', 'Sadia',
        'Seara', 'Cristal', 'Pepsi', 'Dona Benta', 'Kibon', 'Aurora'
      );
    `);
  }
}
