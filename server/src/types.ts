import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { registerEnumType } from "type-graphql";
import { Request, Response } from "express";

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
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
