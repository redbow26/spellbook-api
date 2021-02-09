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
      resolvers: [SpellResolver],
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

// Before the app is exit (on a crash or manually shutdown)
process.on("beforeExit", async (code) => {
  // Save current zenko data
  zenko.save();
  // Close the database
  await mongoose.disconnect();
  // Close the server connection
  server.close();
  // Exit the process
  process.exit(code);
});
