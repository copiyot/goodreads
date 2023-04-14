import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

enum CollectionValues {
  WANT = "Want to read",
  READING = "Reading",
  READ = "Read",
}

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  coverImage: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column({
    type: "enum",
    enum: CollectionValues,
  })
  collection: CollectionValues;

  @ManyToOne(() => User, (user) => user.books)
  creator: User;
}
