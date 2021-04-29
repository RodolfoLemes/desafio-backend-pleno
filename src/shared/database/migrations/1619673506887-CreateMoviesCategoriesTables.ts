import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateMoviesCategoriesTables1619673506887
  implements MigrationInterface {
  name = 'CreateMoviesCategoriesTables1619673506887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "synopsis" text NOT NULL, "released" boolean NOT NULL DEFAULT false, "authorized" boolean NOT NULL DEFAULT false, "cover" character varying NOT NULL, "end_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_categories_categories" ("moviesId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_f76aa01223d41136af04c45f8c2" PRIMARY KEY ("moviesId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3cb1f5cbe98e9bce6d49c6739d" ON "movies_categories_categories" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a807323c84e762113e1253deef" ON "movies_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_categories_categories" ADD CONSTRAINT "FK_3cb1f5cbe98e9bce6d49c6739dd" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_categories_categories" ADD CONSTRAINT "FK_a807323c84e762113e1253deef9" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies_categories_categories" DROP CONSTRAINT "FK_a807323c84e762113e1253deef9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_categories_categories" DROP CONSTRAINT "FK_3cb1f5cbe98e9bce6d49c6739dd"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_a807323c84e762113e1253deef"`);
    await queryRunner.query(`DROP INDEX "IDX_3cb1f5cbe98e9bce6d49c6739d"`);
    await queryRunner.query(`DROP TABLE "movies_categories_categories"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
