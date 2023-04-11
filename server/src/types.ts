import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { registerEnumType } from "type-graphql";

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
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
