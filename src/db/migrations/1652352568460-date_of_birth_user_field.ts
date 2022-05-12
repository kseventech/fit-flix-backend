import { MigrationInterface, QueryRunner } from 'typeorm';

export class dateOfBirthUserField1652352568460 implements MigrationInterface {
  name = 'dateOfBirthUserField1652352568460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ADD "date_of_birth" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "gender" "public"."programs_gender_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "purpose"`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "purpose" "public"."programs_purpose_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "video_type"`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "video_type" "public"."resources_video_type_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "exercise_type"`);
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "exercise_type" "public"."resources_exercise_type_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "exercise_type"`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "exercise_type" resources_exercise_type_enum NOT NULL`);
    await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "video_type"`);
    await queryRunner.query(`ALTER TABLE "resources" ADD "video_type" resources_video_type_enum NOT NULL`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "purpose"`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "purpose" programs_purpose_enum NOT NULL`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "programs" ADD "gender" programs_gender_enum NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "date_of_birth"`);
  }
}
