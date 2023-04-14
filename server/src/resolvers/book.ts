import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
} from "type-graphql";
import jwt from "jsonwebtoken";

import { CollectionValues, MyContext } from "../types";
import { Book } from "../entities/Book";

@InputType()
class CreateBookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  coverImage: string;

  @Field((_type) => CollectionValues)
  collection: CollectionValues;
}

@InputType()
class UpdateBookInput {
  @Field()
  id: number;

  @Field((_type) => CollectionValues)
  collection: CollectionValues;
}

interface UserPayload {
  id: number;
  email: string;
}

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(@Ctx() { req }: MyContext): Promise<Book[] | []> {
    if (!req.session.jwt) {
      return [];
    }

    const { id } = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    const books = await Book.find({ where: { creatorId: id } });
    return books;
  }

  @Mutation(() => Book, { nullable: true })
  async createBook(
    @Arg("options") options: CreateBookInput,
    @Ctx() { req }: MyContext
  ): Promise<Book | null> {
    const { title, author, coverImage, collection } = options;

    if (!req.session.jwt) {
      return null;
    }

    const { id } = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    const book = await Book.create({
      title,
      author,
      coverImage,
      collection,
      creatorId: id,
    }).save();

    return book;
  }

  @Mutation(() => Book, { nullable: true })
  async updateBook(
    @Arg("options") options: UpdateBookInput
  ): Promise<Book | null> {
    const { id, collection } = options;
    const book = await Book.findOneBy({ id });
    if (!book) {
      return null;
    }

    if (typeof collection !== "undefined") {
      await Book.update({ id }, { collection });
    }
    return book;
  }
}
