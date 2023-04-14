import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1681512624913 implements MigrationInterface {
    name = 'Initial1681512624913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."book_collection_enum" AS ENUM('Want to read', 'Reading', 'Read')`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "author" character varying NOT NULL, "coverImage" character varying NOT NULL, "creatorId" integer NOT NULL, "collection" "public"."book_collection_enum" NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_36efb6ed185731f3c4df150b94b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_36efb6ed185731f3c4df150b94b"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TYPE "public"."book_collection_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
