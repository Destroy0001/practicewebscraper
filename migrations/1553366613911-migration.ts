import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1553366613911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "package" varchar NOT NULL, "name" varchar NOT NULL, "category" varchar, "description" text DEFAULT (''), "iconUrl" varchar DEFAULT (''), "trailerUrl" varchar DEFAULT (''), "screenshotUrlList" text DEFAULT (''), CONSTRAINT "UQ_4e68b18c0aa56385497fcadb609" UNIQUE ("package"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
