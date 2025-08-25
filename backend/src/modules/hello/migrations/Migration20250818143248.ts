import { Migration } from '@mikro-orm/migrations';

export class Migration20250818143248 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "custom" add column if not exists "faq" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "custom" drop column if exists "faq";`);
  }

}
