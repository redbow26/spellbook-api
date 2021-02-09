import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";

import { SpellResolver } from "./resolvers/SpellResolver";
import { TypeZenko } from "./types/TypeZenko";
import { Server } from "http";
import { ZenkoResolver } from "./resolvers/ZenkoResolver";

// Data for health and mana for zenko
const zenko = new TypeZenko();

// Create express app for the server
const app = express();
// Store the http server
let server: Server;

(async () => {
  // Setup the cors
  app.use(
    cors({
      origin: [""],
      credentials: true,
    })
  );

  // Get the port in the env variable or take 3001
  const PORT = process.env.PORT || 3001;

  // Create a mongodb connection
  await mongoose.connect(`${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SpellResolver, ZenkoResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, zenko }),
  });

  //
  apolloServer.applyMiddleware({ app, cors: false });

  // Launch the app on the correct port
  server = app.listen(PORT, () => {
    console.log(`App listen on port: ${PORT}`);
  });
})();

// catching signals and do something before exit
[
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
].forEach(function (sig) {
  process.on(sig, function () {
    process.exit(0);
  });
});

// Before the app is exit (on a crash or manually shutdown)
process.on("exit", () => {
  // Save current zenko data
  zenko.save();
  // Close the mongoose connection
  mongoose.connection.close();
  // Close the server connection
  server.close();
});
