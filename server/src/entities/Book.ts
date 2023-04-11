import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

enum CollectionValues {
  WANT = "Want to read",
  READING = "Reading",
  READ = "Read",
}

@ObjectType()
@Entity()
export class Book {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  createdAt?: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  author: string;

  @Field()
  @Property()
  coverImage: string;

  @Field()
  @Enum(() => CollectionValues)
  collection: CollectionValues;
}
