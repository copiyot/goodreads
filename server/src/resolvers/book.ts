import { Resolver, Query } from "type-graphql";

@Resolver()
export class BookResolver {
  @Query(() => String)
  book() {
    return "Just a book";
  }
}
