import { Migration } from '@mikro-orm/migrations';

export class Migration20230412165130 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "author" varchar(255) not null, "cover_image" varchar(255) not null, "collection" text check ("collection" in (\'Want to read\', \'Reading\', \'Read\')) not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "username" text not null, "password" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "book" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
