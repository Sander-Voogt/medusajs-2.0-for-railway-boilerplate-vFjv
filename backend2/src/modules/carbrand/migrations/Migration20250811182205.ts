import { Migration } from '@mikro-orm/migrations';

export class Migration20250811182205 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "carbrand" ("id" text not null, "name" text not null, "title" text null, "intro" text null, "description" text null, "image" text null, "MetaKeywords" text null, "MetaDescription" text null, "MetaTitle" text null, "Published" boolean null, "Deleted" boolean null, "DisplayOrder" integer null, "CreatedOnUtc" timestamptz null, "UpdatedOnUtc" timestamptz null, "BottomDescription" text null, "StructuredData" text null, "H1Title" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "carbrand_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_carbrand_deleted_at" ON "carbrand" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "carbrand" cascade;`);
  }

}
