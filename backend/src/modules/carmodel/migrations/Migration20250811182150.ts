import { Migration } from '@mikro-orm/migrations';

export class Migration20250811182150 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "carmodel" ("id" text not null, "name" text not null, "title" text null, "intro" text null, "description" text null, "image" text null, "PictureId" text null, "Description" text null, "MetaKeywords" text null, "MetaDescription" text null, "MetaTitle" text null, "Published" integer null, "Deleted" boolean null, "DisplayOrder" integer null, "CreatedOnUtc" timestamptz null, "UpdatedOnUtc" timestamptz null, "ModelBannerId" text null, "ChargingStationDescription" text null, "ChargingCableDescription" text null, "AccessoriesDescription" text null, "ModelBannerDescription" text null, "CableType" integer null, "is1F16A" integer null, "is1F32A" integer null, "is3F16A" integer null, "is3F32A" integer null, "CablePictureId" integer null, "StructuredData" text null, "H1Title" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "carmodel_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_carmodel_deleted_at" ON "carmodel" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "carmodel" cascade;`);
  }

}
