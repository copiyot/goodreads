import { DataSource } from "typeorm";
import path from "path";

import { Book } from "./entities/Book";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "castroopiyo",
  password: "J@k0d0ng0",
  database: "goodreads_clone",
  entities: [User, Book],
  migrations: [path.join(__dirname, "./migrations/*")],
  logging: true,
});
