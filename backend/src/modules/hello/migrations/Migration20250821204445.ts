import { Migration } from '@mikro-orm/migrations';

export class Migration20250821204445 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "custom" add column if not exists "maindescription" text null, add column if not exists "video" text null;`);
    this.addSql(`alter table if exists "custom" alter column "custom_name" type text using ("custom_name"::text);`);
    this.addSql(`alter table if exists "custom" alter column "custom_name" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "custom" drop column if exists "maindescription", drop column if exists "video";`);

    this.addSql(`alter table if exists "custom" alter column "custom_name" type text using ("custom_name"::text);`);
    this.addSql(`alter table if exists "custom" alter column "custom_name" set not null;`);
  }

}
