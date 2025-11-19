import { MigrationInterface, QueryRunner } from 'typeorm';

export class init_schema implements MigrationInterface {
  name = 'init_schema';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing tables if they exist (dev-squash). This will erase data.
    await queryRunner.query(`DROP TABLE IF EXISTS "event"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);

    // USER
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "name" varchar NOT NULL,
        "email" varchar NOT NULL,
        "theme" varchar NOT NULL DEFAULT 'light',
        CONSTRAINT "UQ_user_email" UNIQUE ("email")
      )
    `);

    // EVENT with new column names that match the Entity
    await queryRunner.query(`
      CREATE TABLE "event" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,

        
        "unitName" varchar NOT NULL,
        "date" date NOT NULL,
        "time" varchar NULL,
        "text" varchar NOT NULL,
        "unitActivityOptions" varchar NOT NULL,
        "activityOptions" varchar NOT NULL,
        "categoryOptions" varchar NOT NULL,
        "categorySubOptions" varchar NULL,
        "subCategoryOptions" varchar NULL,
        "subSubCategoryOptions" varchar NULL,

        
        "eventFactorOptions" varchar NULL,
        "eventResultOptions" varchar NOT NULL,
        "eventSeverity" varchar NOT NULL,
        "eventOutcomeByCategory" varchar NOT NULL,
        "damageType" varchar NULL,

        
        "location" varchar NOT NULL,
        "locationDescription" varchar NULL,
        "weather" varchar NULL,
        "latitude" real NULL,
        "longitude" real NULL,

        
        "recommendations" varchar NULL,
        "costAmount" real NULL,

        
                "status" varchar NOT NULL DEFAULT '���'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "event"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}
