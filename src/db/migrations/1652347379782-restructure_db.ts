import { MigrationInterface, QueryRunner } from 'typeorm';

export class restructureDb1652347379782 implements MigrationInterface {
  name = 'restructureDb1652347379782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" DROP CONSTRAINT "FK_e3d7243c93c80ca6c58471a6dec"`,
    );
    await queryRunner.query(
      `CREATE TABLE "equipments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "title" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."trainings_status_enum" AS ENUM('Active', 'Inactive')`);
    await queryRunner.query(
      `CREATE TABLE "trainings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "status" "public"."trainings_status_enum" NOT NULL, "start_date" TIMESTAMP NOT NULL, "program_attempt_id" uuid, "ephemeral_program_attempts_id" uuid, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "program_training_days" ("program_id" uuid NOT NULL, "training_day_id" uuid NOT NULL, "training_day_order" character varying NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_f4298489f5873e1daac863b8496" PRIMARY KEY ("program_id", "training_day_id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."training_days_video_type_enum" AS ENUM('Video')`);
    await queryRunner.query(`CREATE TYPE "public"."training_days_excercise_type_enum" AS ENUM('Video')`);
    await queryRunner.query(
      `CREATE TABLE "training_days" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "title" character varying NOT NULL, "intensity_level" double precision NOT NULL, "video_type" "public"."training_days_video_type_enum" NOT NULL, "excercise_type" "public"."training_days_excercise_type_enum" NOT NULL, CONSTRAINT "PK_72f628008796eb5c1dee081b648" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "training_days_resources" ("training_day_id" uuid NOT NULL, "resource_id" uuid NOT NULL, "resource_order" character varying NOT NULL, "pause" character varying NOT NULL, CONSTRAINT "PK_5f76ed74ddedeb47d9ff26a487b" PRIMARY KEY ("training_day_id", "resource_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "equipment_resources" ("equipments_id" uuid NOT NULL, "resources_id" uuid NOT NULL, CONSTRAINT "PK_8500f2b2bef79878724549d7a9d" PRIMARY KEY ("equipments_id", "resources_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bf9dc7351072cc6fb55deaab6" ON "equipment_resources" ("equipments_id") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_4eceafd992887e89e2d766cd12" ON "equipment_resources" ("resources_id") `);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" DROP CONSTRAINT "PK_e3d7243c93c80ca6c58471a6dec" CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "ephemeral_program_attempts" DROP COLUMN "account_id"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "media_type"`);
    await queryRunner.query(`DROP TYPE "public"."resources_media_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" ADD CONSTRAINT "PK_80c2edcdfae96f2f030e8e30f8c" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "ephemeral_program_attempts" ADD "account_id_id" uuid`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "intensity_level" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "total_met" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "excercise_type" double precision NOT NULL`);
    await queryRunner.query(`CREATE TYPE "public"."programs_gender_enum" AS ENUM()`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "gender" "public"."programs_gender_enum" NOT NULL`);
    await queryRunner.query(`CREATE TYPE "public"."programs_purpose_enum" AS ENUM()`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "purpose" "public"."programs_purpose_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "met" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "reps" double precision NOT NULL`);
    await queryRunner.query(`CREATE TYPE "public"."resources_video_type_enum" AS ENUM()`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "video_type" "public"."resources_video_type_enum" NOT NULL`);
    await queryRunner.query(`CREATE TYPE "public"."resources_exercise_type_enum" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "exercise_type" "public"."resources_exercise_type_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "resources" ADD "rpe" integer`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" ADD CONSTRAINT "FK_0798ac9ada8db12c874c5b049bc" FOREIGN KEY ("account_id_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_7d81644cd752364163c9429f380" FOREIGN KEY ("program_attempt_id") REFERENCES "program_attempts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_755c159b3bdd612f7bf5c3bd33d" FOREIGN KEY ("ephemeral_program_attempts_id") REFERENCES "ephemeral_program_attempts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_training_days" ADD CONSTRAINT "FK_64330a763b98afc7cfa14e481fb" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_training_days" ADD CONSTRAINT "FK_51b92b4d76a4f1335d9995bc52e" FOREIGN KEY ("training_day_id") REFERENCES "training_days"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_days_resources" ADD CONSTRAINT "FK_54b8b15fafdc49afea9263281d6" FOREIGN KEY ("training_day_id") REFERENCES "training_days"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training_days_resources" ADD CONSTRAINT "FK_842a2167ef1fb356344b201432f" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_resources" ADD CONSTRAINT "FK_9bf9dc7351072cc6fb55deaab64" FOREIGN KEY ("equipments_id") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_resources" ADD CONSTRAINT "FK_4eceafd992887e89e2d766cd128" FOREIGN KEY ("resources_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "equipment_resources" DROP CONSTRAINT "FK_4eceafd992887e89e2d766cd128"`);
    await queryRunner.query(`ALTER TABLE "equipment_resources" DROP CONSTRAINT "FK_9bf9dc7351072cc6fb55deaab64"`);
    await queryRunner.query(`ALTER TABLE "training_days_resources" DROP CONSTRAINT "FK_842a2167ef1fb356344b201432f"`);
    await queryRunner.query(`ALTER TABLE "training_days_resources" DROP CONSTRAINT "FK_54b8b15fafdc49afea9263281d6"`);
    await queryRunner.query(`ALTER TABLE "program_training_days" DROP CONSTRAINT "FK_51b92b4d76a4f1335d9995bc52e"`);
    await queryRunner.query(`ALTER TABLE "program_training_days" DROP CONSTRAINT "FK_64330a763b98afc7cfa14e481fb"`);
    await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_755c159b3bdd612f7bf5c3bd33d"`);
    await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_7d81644cd752364163c9429f380"`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" DROP CONSTRAINT "FK_0798ac9ada8db12c874c5b049bc"`,
    );
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "rpe"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "exercise_type"`);
    await queryRunner.query(`DROP TYPE "public"."resources_exercise_type_enum"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "video_type"`);
    await queryRunner.query(`DROP TYPE "public"."resources_video_type_enum"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "reps"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "met"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "purpose"`);
    await queryRunner.query(`DROP TYPE "public"."programs_purpose_enum"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."programs_gender_enum"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "excercise_type"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "total_met"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "intensity_level"`);
    await queryRunner.query(`ALTER TABLE "ephemeral_program_attempts" DROP COLUMN "account_id_id"`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" DROP CONSTRAINT "PK_80c2edcdfae96f2f030e8e30f8c"`,
    );
    await queryRunner.query(`ALTER TABLE "ephemeral_program_attempts" DROP COLUMN "id"`);
    await queryRunner.query(`CREATE TYPE "public"."resources_media_type_enum" AS ENUM('Video')`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "media_type" "public"."resources_media_type_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ephemeral_program_attempts" ADD "account_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" ADD CONSTRAINT "PK_e3d7243c93c80ca6c58471a6dec" PRIMARY KEY ("account_id")`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_4eceafd992887e89e2d766cd12"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9bf9dc7351072cc6fb55deaab6"`);
    await queryRunner.query(`DROP TABLE "equipment_resources"`);
    await queryRunner.query(`DROP TABLE "training_days_resources"`);
    await queryRunner.query(`DROP TABLE "training_days"`);
    await queryRunner.query(`DROP TYPE "public"."training_days_excercise_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."training_days_video_type_enum"`);
    await queryRunner.query(`DROP TABLE "program_training_days"`);
    await queryRunner.query(`DROP TABLE "trainings"`);
    await queryRunner.query(`DROP TYPE "public"."trainings_status_enum"`);
    await queryRunner.query(`DROP TABLE "equipments"`);
    await queryRunner.query(
      `ALTER TABLE "ephemeral_program_attempts" ADD CONSTRAINT "FK_e3d7243c93c80ca6c58471a6dec" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
