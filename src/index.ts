import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";

import { SpellResolver } from "./resolvers/SpellResolver";

(async () => {
  const app = express();
  app.use(
    cors({
      origin: [""],
      credentials: true,
    })
  );
  const PORT = process.env.PORT || 3001;

  await mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SpellResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`App listen on port: ${PORT}`);
  });
})();
