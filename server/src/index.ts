import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import session from "express-session";
import cors from "cors";
import Redis from "ioredis";
import RedisStore from "connect-redis";
require("dotenv").config();

import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, __prod__ } from "./constants";
import { AppDataSource } from "./dataSourceConfig";

const main = async () => {
  (await AppDataSource.initialize()).runMigrations();

  const app = express();

  const redis = new Redis();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    })
  );

  app.set("trust proxy", 1);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new (RedisStore as any)({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 3, // 3 hours
        httpOnly: true,
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Listening on Port: 4000");
  });
};

main().catch((err) => console.error(err));
