import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedContacts1760366705771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO contacts (country_code, ddd, phone_number) VALUES
      (55, 11, '98877-1122'),
      (55, 21, '98765-4321'),
      (55, 31, '99654-3210'),
      (55, 41, '99443-2211'),
      (55, 51, '99123-4567'),
      (55, 61, '98989-8989'),
      (55, 71, '99777-7777'),
      (55, 81, '99333-4444'),
      (55, 91, '98666-5555'),
      (55, 98, '98555-6666');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM contacts WHERE
        (country_code = 55 AND ddd = 11 AND phone_number = '98877-1122') OR
        (country_code = 55 AND ddd = 21 AND phone_number = '98765-4321') OR
        (country_code = 55 AND ddd = 31 AND phone_number = '99654-3210') OR
        (country_code = 55 AND ddd = 41 AND phone_number = '99443-2211') OR
        (country_code = 55 AND ddd = 51 AND phone_number = '99123-4567') OR
        (country_code = 55 AND ddd = 61 AND phone_number = '98989-8989') OR
        (country_code = 55 AND ddd = 71 AND phone_number = '99777-7777') OR
        (country_code = 55 AND ddd = 81 AND phone_number = '99333-4444') OR
        (country_code = 55 AND ddd = 91 AND phone_number = '98666-5555') OR
        (country_code = 55 AND ddd = 98 AND phone_number = '98555-6666');
    `);
  }
}
