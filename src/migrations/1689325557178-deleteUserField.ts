import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteUserField1689325557178 implements MigrationInterface {
    name = 'DeleteUserField1689325557178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login" TIMESTAMP(3) WITH TIME ZONE`);
    }

}
