import { DataSource } from "typeorm";
import path from "path";

import { Book } from "./entities/Book";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "goodreads_clone",
  entities: [User, Book],
  migrations: [path.join(__dirname, "./migrations/*")],
  logging: true,
});
