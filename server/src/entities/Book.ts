import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// import { ObjectType, Field } from "type-graphql";

// @ObjectType()
@Entity()
export class Book {
  //   @Field()
  @PrimaryKey()
  id!: number;

  //   @Field()
  @Property()
  createdAt?: Date = new Date();

  //   @Field(()=> String)
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  //   @Field()
  @Property()
  name: string;

  //   @Field()
  @Property()
  value: number;
}
