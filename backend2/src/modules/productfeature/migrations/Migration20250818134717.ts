import { Migration } from '@mikro-orm/migrations';

export class Migration20250818134717 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "productfeature" add column if not exists "custom_name" text null;`);
    this.addSql(`alter table if exists "productfeature" alter column "description" type text using ("description"::text);`);
    this.addSql(`alter table if exists "productfeature" alter column "description" drop not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "video" type text using ("video"::text);`);
    this.addSql(`alter table if exists "productfeature" alter column "video" drop not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "procon" type jsonb using ("procon"::jsonb);`);
    this.addSql(`alter table if exists "productfeature" alter column "procon" drop not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "faq" type jsonb using ("faq"::jsonb);`);
    this.addSql(`alter table if exists "productfeature" alter column "faq" drop not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "evservicechoice" type boolean using ("evservicechoice"::boolean);`);
    this.addSql(`alter table if exists "productfeature" alter column "evservicechoice" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "productfeature" drop column if exists "custom_name";`);

    this.addSql(`alter table if exists "productfeature" alter column "description" type text using ("description"::text);`);
    this.addSql(`alter table if exists "productfeature" alter column "description" set not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "video" type text using ("video"::text);`);
    this.addSql(`alter table if exists "productfeature" alter column "video" set not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "procon" type jsonb using ("procon"::jsonb);`);
    this.addSql(`alter table if exists "productfeature" alter column "procon" set not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "faq" type jsonb using ("faq"::jsonb);`);
    this.addSql(`alter table if exists "productfeature" alter column "faq" set not null;`);
    this.addSql(`alter table if exists "productfeature" alter column "evservicechoice" type boolean using ("evservicechoice"::boolean);`);
    this.addSql(`alter table if exists "productfeature" alter column "evservicechoice" set not null;`);
  }

}
