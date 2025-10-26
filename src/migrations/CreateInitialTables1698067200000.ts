import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInitialTables1698067200000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'theme', type: 'varchar', default: 'light' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'unitName', type: 'varchar' },
          { name: 'date', type: 'date' },
          { name: 'time', type: 'time', isNullable: true },
          { name: 'category', type: 'varchar' },
          { name: 'eventSeverity', type: 'varchar' },
          { name: 'eventOutcome', type: 'varchar' },
          { name: 'damageType', type: 'varchar', isNullable: true },
          { name: 'location', type: 'varchar' },
          { name: 'locationDescription', type: 'varchar', isNullable: true },
          { name: 'weather', type: 'varchar', isNullable: true },
          { name: 'text', type: 'text' },
          { name: 'unitActivityType', type: 'varchar' },
          { name: 'activityType', type: 'varchar' },
          { name: 'investigation', type: 'varchar', isNullable: true },
          { name: 'coordinates', type: 'text' },
          { name: 'casualties', type: 'text', isNullable: true },
          { name: 'subSubCategoryOptions', type: 'varchar', isNullable: true },
          { name: 'recommendations', type: 'text', isNullable: true },
          { name: 'costAmount', type: 'real', isNullable: true },
          { name: 'categorySubOptions', type: 'varchar', isNullable: true },
          { name: 'subCategoryOptions', type: 'varchar', isNullable: true },
          { name: 'eventFactor', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'status', type: 'varchar', default: 'בטיפול' },
          { name: 'imageUrl', type: 'varchar', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event', true);
    await queryRunner.dropTable('user', true);
  }
}
