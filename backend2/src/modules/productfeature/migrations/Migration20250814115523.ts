import { Migration } from '@mikro-orm/migrations';

export class Migration20250814115523 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "productfeature" ("id" text not null, "description" text not null, "video" text not null, "procon" jsonb not null, "faq" jsonb not null, "evservicechoice" boolean not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "productfeature_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_productfeature_deleted_at" ON "productfeature" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "productfeature" cascade;`);
  }

}
