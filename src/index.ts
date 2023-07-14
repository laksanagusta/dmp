import { PgDataSource } from "./config/ormconfig";
import { __port } from "./config/credentials";
import createServer from "./app/server";

const main = async () => {
  await PgDataSource.initialize();
  await PgDataSource.runMigrations();

  createServer().listen(__port, () => {
    console.log("server is running in PORT ", __port);
  });
};

main().catch((err) => {
  console.error(err);
});
