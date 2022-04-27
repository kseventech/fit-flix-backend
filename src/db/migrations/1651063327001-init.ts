import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1651063327001 implements MigrationInterface {
  name = 'init1651063327001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."categories_status_enum" AS ENUM('Active', 'Inactive')`);
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "status" "public"."categories_status_enum" NOT NULL, "image_url" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."resources_media_type_enum" AS ENUM('Video')`);
    await queryRunner.query(`CREATE TYPE "public"."resources_status_enum" AS ENUM('Active', 'Inactive')`);
    await queryRunner.query(`CREATE TYPE "public"."resources_provider_enum" AS ENUM('Vimeo')`);
    await queryRunner.query(`CREATE TYPE "public"."resources_type_enum" AS ENUM('Full', 'TR', 'Vid')`);
    await queryRunner.query(
      `CREATE TABLE "resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "media_type" "public"."resources_media_type_enum" NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."resources_status_enum" NOT NULL, "provider" "public"."resources_provider_enum" NOT NULL, "duration_in_sec" double precision NOT NULL, "thumb_url" character varying NOT NULL, "type" "public"."resources_type_enum" NOT NULL, "additional_info" json NOT NULL, "intensity_level" double precision NOT NULL, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "programs_resources" ("program_id" uuid NOT NULL, "resource_id" uuid NOT NULL, "playlist_order" character varying NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_4d527b8479a49b1fec8fb3632c9" PRIMARY KEY ("program_id", "resource_id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."programs_status_enum" AS ENUM('Active', 'Inactive')`);
    await queryRunner.query(`CREATE TYPE "public"."programs_level_enum" AS ENUM('Pocetni')`);
    await queryRunner.query(`CREATE TYPE "public"."programs_duration_enum" AS ENUM('Day', 'Hour', 'Month', 'Week')`);
    await queryRunner.query(`CREATE TYPE "public"."programs_section_enum" AS ENUM('PT', 'VOD')`);
    await queryRunner.query(
      `CREATE TABLE "programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "desc" character varying NOT NULL, "status" "public"."programs_status_enum" NOT NULL, "image_url" character varying NOT NULL, "level" "public"."programs_level_enum" NOT NULL, "duration" "public"."programs_duration_enum" NOT NULL, "duration_unit" double precision NOT NULL, "section" "public"."programs_section_enum" NOT NULL, "category_id" uuid, CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."program_attempts_status_enum" AS ENUM('Active', 'Inactive')`);
    await queryRunner.query(
      `CREATE TABLE "program_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "status" "public"."program_attempts_status_enum" NOT NULL, "start_date" TIMESTAMP NOT NULL, "account_id_id" uuid, "program_id" uuid, CONSTRAINT "PK_e5dce17db068ea94fd39e515005" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."accounts_status_enum" AS ENUM('Active', 'Blocked')`);
    await queryRunner.query(`CREATE TYPE "public"."accounts_role_enum" AS ENUM('Admin', 'User')`);
    await queryRunner.query(`CREATE TYPE "public"."accounts_gender_enum" AS ENUM('Male', 'Femaile')`);
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "email" character varying NOT NULL, "firebase_id" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone_number" character varying NOT NULL, "status" "public"."accounts_status_enum" NOT NULL, "role" "public"."accounts_role_enum" NOT NULL, "avatar_url" character varying NOT NULL, "age" integer NOT NULL, "height" double precision NOT NULL, "weight" double precision NOT NULL, "gender" "public"."accounts_gender_enum" NOT NULL, "goal_weight" double precision NOT NULL, "has_rated_app" boolean NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ephemeral_program_attempts_status_enum" AS ENUM('Active', 'Inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ephemeral_program_attempts" ("account_id" uuid NOT NULL, "status" "public"."ephemeral_program_attempts_status_enum" NOT NULL, "start_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_e3d7243c93c80ca6c58471a6dec" PRIMARY KEY ("account_id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."tranings_status_enum" AS ENUM('Active', 'Inactive')`);
    await queryRunner.query(
      `CREATE TABLE "tranings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "status" "public"."tranings_status_enum" NOT NULL, "start_date" TIMESTAMP NOT NULL, "resource_id" uuid, "program_attempt_id" uuid, "ephemeral_program_attempt_account_id" uuid, CONSTRAINT "PK_c140ff5eed08ffac0c882e16d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags_resources" ("tags_id" uuid NOT NULL, "resources_id" uuid NOT NULL, CONSTRAINT "PK_d4201c5401d64dd0e369d7212e2" PRIMARY KEY ("tags_id", "resources_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_45ddf5d25d048794f52285fd5c" ON "tags_resources" ("tags_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_0f12aea8bc64d733833929ba0d" ON "tags_resources" ("resources_id") `);
    await queryRunner.query(
      `ALTER TABLE "programs_resources" ADD CONSTRAINT "FK_f3c1a45f78180d538ba46da6bdb" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs_resources" ADD CONSTRAINT "FK_63e9faaa04ef65c2484cc2c223b" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD CONSTRAINT "FK_9a28e56a3b06417bec6985259cd" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_attempts" ADD CONSTRAINT "FK_df3f472ed95c98eed5c6b2199c9" FOREIGN KEY ("account_id_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_attempts" ADD CONSTRAINT "FK_b8244e1f26e5d8f2702f954571f" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" ADD CONSTRAINT "FK_e3d7243c93c80ca6c58471a6dec" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tranings" ADD CONSTRAINT "FK_f67deffc159845cc30d6f5061b1" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tranings" ADD CONSTRAINT "FK_a2afd17294fcec43a52c95d65bb" FOREIGN KEY ("program_attempt_id") REFERENCES "program_attempts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tranings" ADD CONSTRAINT "FK_4898b30b43ed0cdd81e91007c55" FOREIGN KEY ("ephemeral_program_attempt_account_id") REFERENCES "ephemeral_program_attempts"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_resources" ADD CONSTRAINT "FK_45ddf5d25d048794f52285fd5c2" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_resources" ADD CONSTRAINT "FK_0f12aea8bc64d733833929ba0d7" FOREIGN KEY ("resources_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags_resources" DROP CONSTRAINT "FK_0f12aea8bc64d733833929ba0d7"`);
    await queryRunner.query(`ALTER TABLE "tags_resources" DROP CONSTRAINT "FK_45ddf5d25d048794f52285fd5c2"`);
    await queryRunner.query(`ALTER TABLE "tranings" DROP CONSTRAINT "FK_4898b30b43ed0cdd81e91007c55"`);
    await queryRunner.query(`ALTER TABLE "tranings" DROP CONSTRAINT "FK_a2afd17294fcec43a52c95d65bb"`);
    await queryRunner.query(`ALTER TABLE "tranings" DROP CONSTRAINT "FK_f67deffc159845cc30d6f5061b1"`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" DROP CONSTRAINT "FK_e3d7243c93c80ca6c58471a6dec"`,
    );
    await queryRunner.query(`ALTER TABLE "program_attempts" DROP CONSTRAINT "FK_b8244e1f26e5d8f2702f954571f"`);
    await queryRunner.query(`ALTER TABLE "program_attempts" DROP CONSTRAINT "FK_df3f472ed95c98eed5c6b2199c9"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_9a28e56a3b06417bec6985259cd"`);
    await queryRunner.query(`ALTER TABLE "programs_resources" DROP CONSTRAINT "FK_63e9faaa04ef65c2484cc2c223b"`);
    await queryRunner.query(`ALTER TABLE "programs_resources" DROP CONSTRAINT "FK_f3c1a45f78180d538ba46da6bdb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0f12aea8bc64d733833929ba0d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_45ddf5d25d048794f52285fd5c"`);
    await queryRunner.query(`DROP TABLE "tags_resources"`);
    await queryRunner.query(`DROP TABLE "tranings"`);
    await queryRunner.query(`DROP TYPE "public"."tranings_status_enum"`);
    await queryRunner.query(`DROP TABLE "ephemeral_program_attempts"`);
    await queryRunner.query(`DROP TYPE "public"."ephemeral_program_attempts_status_enum"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_status_enum"`);
    await queryRunner.query(`DROP TABLE "program_attempts"`);
    await queryRunner.query(`DROP TYPE "public"."program_attempts_status_enum"`);
    await queryRunner.query(`DROP TABLE "programs"`);
    await queryRunner.query(`DROP TYPE "public"."programs_section_enum"`);
    await queryRunner.query(`DROP TYPE "public"."programs_duration_enum"`);
    await queryRunner.query(`DROP TYPE "public"."programs_level_enum"`);
    await queryRunner.query(`DROP TYPE "public"."programs_status_enum"`);
    await queryRunner.query(`DROP TABLE "programs_resources"`);
    await queryRunner.query(`DROP TABLE "resources"`);
    await queryRunner.query(`DROP TYPE "public"."resources_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."resources_provider_enum"`);
    await queryRunner.query(`DROP TYPE "public"."resources_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."resources_media_type_enum"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TYPE "public"."categories_status_enum"`);
  }
}
