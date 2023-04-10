import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { CollectionValues } from "../types";
import { ObjectType, Field } from "type-graphql";

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
  @Enum()
  collection: CollectionValues;
}
