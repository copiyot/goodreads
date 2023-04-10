import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Book } from "./entities/Book";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const post = orm.em.create(Book, { name: "castro", value: 31 });
  await orm.em.persistAndFlush(post);
};

main().catch((err) => console.error(err));
