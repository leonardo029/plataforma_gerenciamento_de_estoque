import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProducts1760373997821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (
        name,
        identification_code,
        description,
        id_brand,
        id_category,
        id_nutritional_information,
        unit_of_measurement,
        is_activated
      ) VALUES
      (
        'Arroz Tipo 1 5kg',
        '7894092251423',
        'Arroz Tipo 1 5kg da marca Vitarella, categoria CEREAIS E GRÃOS.',
        (SELECT id FROM brands WHERE name = 'Vitarella'),
        (SELECT id FROM categories WHERE name = 'CEREAIS E GRÃOS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 29 AND protein = 10 AND total_fat = 18 AND fiber = 5 AND is_allergenic = true),
        'kg',
        true
      ),
      (
        'Feijão Carioca 1kg',
        '7896419426549',
        'Feijão Carioca 1kg da marca Vitarella, categoria CEREAIS E GRÃOS.',
        (SELECT id FROM brands WHERE name = 'Vitarella'),
        (SELECT id FROM categories WHERE name = 'CEREAIS E GRÃOS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 54 AND protein = 0 AND total_fat = 20 AND fiber = 9 AND is_allergenic = true),
        'kg',
        true
      ),
      (
        'Macarrão Espaguete 500g',
        '7897199273618',
        'Macarrão Espaguete 500g da marca Santa Amália, categoria MASSAS E MACARRÃO.',
        (SELECT id FROM brands WHERE name = 'Santa Amália'),
        (SELECT id FROM categories WHERE name = 'MASSAS E MACARRÃO'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 19 AND protein = 16 AND total_fat = 13 AND fiber = 7 AND is_allergenic = false),
        'g',
        true
      ),
      (
        'Farinha de Trigo 1kg',
        '7895112997509',
        'Farinha de Trigo 1kg da marca Dona Benta, categoria FARINHAS E FÉCULAS.',
        (SELECT id FROM brands WHERE name = 'Dona Benta'),
        (SELECT id FROM categories WHERE name = 'FARINHAS E FÉCULAS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 66 AND protein = 3 AND total_fat = 10 AND fiber = 5 AND is_allergenic = true),
        'kg',
        true
      ),
      (
        'Mistura para Bolo Chocolate 400g',
        '7894418075650',
        'Mistura para Bolo Chocolate 400g da marca Dona Benta, categoria FARINHAS E FÉCULAS.',
        (SELECT id FROM brands WHERE name = 'Dona Benta'),
        (SELECT id FROM categories WHERE name = 'FARINHAS E FÉCULAS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 20 AND protein = 8 AND total_fat = 14 AND fiber = 7 AND is_allergenic = true),
        'g',
        false
      ),
      (
        'Açúcar Refinado 1kg',
        '7896120953114',
        'Açúcar Refinado 1kg da marca Cristal, categoria AÇÚCAR E ADOÇANTES.',
        (SELECT id FROM brands WHERE name = 'Cristal'),
        (SELECT id FROM categories WHERE name = 'AÇÚCAR E ADOÇANTES'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 12 AND protein = 2 AND total_fat = 1 AND fiber = 3 AND is_allergenic = false),
        'kg',
        true
      ),
      (
        'Óleo de Soja 900ml',
        '7890688659102',
        'Óleo de Soja 900ml da marca Soya, categoria ÓLEOS E GORDURAS.',
        (SELECT id FROM brands WHERE name = 'Soya'),
        (SELECT id FROM categories WHERE name = 'ÓLEOS E GORDURAS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 70 AND protein = 5 AND total_fat = 4 AND fiber = 2 AND is_allergenic = false),
        'ml',
        false
      ),
      (
        'Margarina 500g',
        '7890139439074',
        'Margarina 500g da marca Qualy, categoria ÓLEOS E GORDURAS.',
        (SELECT id FROM brands WHERE name = 'Qualy'),
        (SELECT id FROM categories WHERE name = 'ÓLEOS E GORDURAS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 33 AND protein = 6 AND total_fat = 7 AND fiber = 8 AND is_allergenic = true),
        'g',
        true
      ),
      (
        'Tempero Sazon Carnes 60g',
        '7899259973741',
        'Tempero Sazon Carnes 60g da marca Sazon, categoria TEMPEROS E CONDIMENTOS.',
        (SELECT id FROM brands WHERE name = 'Sazon'),
        (SELECT id FROM categories WHERE name = 'TEMPEROS E CONDIMENTOS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 45 AND protein = 11 AND total_fat = 5 AND fiber = 6 AND is_allergenic = false),
        'g',
        false
      ),
      (
        'Extrato de Tomate 130g',
        '7898862345877',
        'Extrato de Tomate 130g da marca Quero, categoria MOLHOS E EXTRATOS.',
        (SELECT id FROM brands WHERE name = 'Quero'),
        (SELECT id FROM categories WHERE name = 'MOLHOS E EXTRATOS'),
        (SELECT id FROM nutritional_informations WHERE portion = '100g' AND carbohydrate = 25 AND protein = 7 AND total_fat = 9 AND fiber = 4 AND is_allergenic = true),
        'g',
        true
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM products WHERE identification_code IN (
        '7894092251423',
        '7896419426549',
        '7897199273618',
        '7895112997509',
        '7894418075650',
        '7896120953114',
        '7890688659102',
        '7890139439074',
        '7899259973741',
        '7898862345877'
      );
    `);
  }
}
