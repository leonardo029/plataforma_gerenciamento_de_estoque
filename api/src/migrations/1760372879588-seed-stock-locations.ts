import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStockLocations1760372879588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO stock_locations (id_shelf, id_corridor, id_section) VALUES
      ((SELECT id FROM shelves WHERE name = 'PRAT01'), (SELECT id FROM corridors WHERE name = 'COR01'), (SELECT id FROM sections WHERE name = 'SEC01')),
      ((SELECT id FROM shelves WHERE name = 'PRAT02'), (SELECT id FROM corridors WHERE name = 'COR03'), (SELECT id FROM sections WHERE name = 'SEC05')),
      ((SELECT id FROM shelves WHERE name = 'PRAT05'), (SELECT id FROM corridors WHERE name = 'COR10'), (SELECT id FROM sections WHERE name = 'SEC02')),
      ((SELECT id FROM shelves WHERE name = 'PRAT07'), (SELECT id FROM corridors WHERE name = 'COR02'), (SELECT id FROM sections WHERE name = 'SEC04')),
      ((SELECT id FROM shelves WHERE name = 'PRAT09'), (SELECT id FROM corridors WHERE name = 'COR06'), (SELECT id FROM sections WHERE name = 'SEC08')),
      ((SELECT id FROM shelves WHERE name = 'PRAT12'), (SELECT id FROM corridors WHERE name = 'COR04'), (SELECT id FROM sections WHERE name = 'SEC03')),
      ((SELECT id FROM shelves WHERE name = 'PRAT15'), (SELECT id FROM corridors WHERE name = 'COR07'), (SELECT id FROM sections WHERE name = 'SEC06')),
      ((SELECT id FROM shelves WHERE name = 'PRAT18'), (SELECT id FROM corridors WHERE name = 'COR09'), (SELECT id FROM sections WHERE name = 'SEC09')),
      ((SELECT id FROM shelves WHERE name = 'PRAT20'), (SELECT id FROM corridors WHERE name = 'COR12'), (SELECT id FROM sections WHERE name = 'SEC07')),
      ((SELECT id FROM shelves WHERE name = 'PRAT22'), (SELECT id FROM corridors WHERE name = 'COR15'), (SELECT id FROM sections WHERE name = 'SEC05')),
      ((SELECT id FROM shelves WHERE name = 'PRAT25'), (SELECT id FROM corridors WHERE name = 'COR18'), (SELECT id FROM sections WHERE name = 'SEC10')),
      ((SELECT id FROM shelves WHERE name = 'PRAT28'), (SELECT id FROM corridors WHERE name = 'COR20'), (SELECT id FROM sections WHERE name = 'SEC12')),
      ((SELECT id FROM shelves WHERE name = 'PRAT30'), (SELECT id FROM corridors WHERE name = 'COR22'), (SELECT id FROM sections WHERE name = 'SEC14')),
      ((SELECT id FROM shelves WHERE name = 'PRAT33'), (SELECT id FROM corridors WHERE name = 'COR25'), (SELECT id FROM sections WHERE name = 'SEC11')),
      ((SELECT id FROM shelves WHERE name = 'PRAT35'), (SELECT id FROM corridors WHERE name = 'COR27'), (SELECT id FROM sections WHERE name = 'SEC13')),
      ((SELECT id FROM shelves WHERE name = 'PRAT38'), (SELECT id FROM corridors WHERE name = 'COR29'), (SELECT id FROM sections WHERE name = 'SEC15')),
      ((SELECT id FROM shelves WHERE name = 'PRAT40'), (SELECT id FROM corridors WHERE name = 'COR30'), (SELECT id FROM sections WHERE name = 'SEC01')),
      ((SELECT id FROM shelves WHERE name = 'PRAT45'), (SELECT id FROM corridors WHERE name = 'COR28'), (SELECT id FROM sections WHERE name = 'SEC02')),
      ((SELECT id FROM shelves WHERE name = 'PRAT48'), (SELECT id FROM corridors WHERE name = 'COR26'), (SELECT id FROM sections WHERE name = 'SEC03')),
      ((SELECT id FROM shelves WHERE name = 'PRAT50'), (SELECT id FROM corridors WHERE name = 'COR24'), (SELECT id FROM sections WHERE name = 'SEC04'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM stock_locations
      WHERE id_shelf IN (SELECT id FROM shelves WHERE name IN ('PRAT01','PRAT02','PRAT05','PRAT07','PRAT09','PRAT12','PRAT15','PRAT18','PRAT20','PRAT22','PRAT25','PRAT28','PRAT30','PRAT33','PRAT35','PRAT38','PRAT40','PRAT45','PRAT48','PRAT50'))
        AND id_corridor IN (SELECT id FROM corridors WHERE name IN ('COR01','COR03','COR10','COR02','COR06','COR04','COR07','COR09','COR12','COR15','COR18','COR20','COR22','COR25','COR27','COR29','COR30','COR28','COR26','COR24'))
        AND id_section IN (SELECT id FROM sections WHERE name IN ('SEC01','SEC05','SEC02','SEC04','SEC08','SEC03','SEC06','SEC09','SEC07','SEC10','SEC12','SEC14','SEC11','SEC13','SEC15','SEC01','SEC02','SEC03','SEC04'));
    `);
  }
}
