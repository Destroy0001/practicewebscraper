import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1571126926189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "android_application" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "package" varchar NOT NULL, "name" varchar NOT NULL, "category" varchar, "description" text DEFAULT (''), "iconUrl" varchar DEFAULT (''), "trailerUrl" varchar DEFAULT (''), "screenshotUrlList" text DEFAULT (''), CONSTRAINT "UQ_c196425b16b16b1ccb7ee9a3023" UNIQUE ("package"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "android_application"`);
    }

}
