import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  InputType,
  Field,
} from "type-graphql";

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

  @Field((type) => CollectionValues)
  collection: CollectionValues;
}

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books(@Ctx() { em }: MyContext): Promise<Book[]> {
    return em.find(Book, {});
  }

  @Mutation(() => Book, { nullable: true })
  async createBook(
    @Arg("options") options: CreateBookInput,
    @Ctx() { em }: MyContext
  ): Promise<Book> {
    const { title, author, coverImage, collection } = options;
    const book = em.create(Book, { title, author, coverImage, collection });
    await em.persistAndFlush(book);
    return book;
  }
}
