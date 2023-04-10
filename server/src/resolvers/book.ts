import { Resolver, Query, Ctx } from "type-graphql";

import { MyContext } from "../types";

@Resolver()
export class BookResolver {
  @Query(() => String)
  books(@Ctx() { em }: MyContext) {
    return "Just a book";
  }
}
