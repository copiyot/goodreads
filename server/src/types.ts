import { registerEnumType } from "type-graphql";
import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
}

export enum CollectionValues {
  WANT = "Want to read",
  READING = "Reading",
  READ = "Read",
}

registerEnumType(CollectionValues, {
  name: "CollectionValues",
  description: "Possible values for collection",
});
