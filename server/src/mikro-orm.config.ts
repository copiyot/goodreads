import { __prod__ } from "./constants";
import { Book } from "./entities/Book";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  entities: [Book],
  dbName: "goodreads",
  type: "postgresql",
  debug: !__prod__,
  password: "J@k0d0ng0",
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];