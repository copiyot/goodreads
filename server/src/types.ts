import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
}

export enum CollectionValues {
  WANT = "Want to read",
  READING = "Reading",
  READ = "Read",
}
