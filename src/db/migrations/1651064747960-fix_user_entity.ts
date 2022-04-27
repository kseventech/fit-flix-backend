import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixUserEntity1651064747960 implements MigrationInterface {
  name = 'fixUserEntity1651064747960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "first_name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "last_name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "phone_number" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "status" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "avatar_url" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "age" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "height" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "weight" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "gender" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "goal_weight" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "has_rated_app" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "has_rated_app" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "goal_weight" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "gender" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "weight" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "height" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "age" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "avatar_url" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "status" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "phone_number" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "last_name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "first_name" SET NOT NULL`);
  }
}
