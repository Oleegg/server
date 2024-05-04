import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddList1712336664436 implements MigrationInterface {
  name = 'AddList1712336664436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "list" ("id" SERIAL NOT NULL, "todo" character varying NOT NULL,  "user_id" integer, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`,
    );
    await queryRunner.query(`DROP TABLE "list"`);
  }
}
