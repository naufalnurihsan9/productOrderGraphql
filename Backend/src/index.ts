import { Sequelize } from "sequelize";
import { initModels, product, productCreationAttributes } from "./models/init-models";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
const typeDefs = readFileSync("./src/product.graphql").toString("utf-8");

import * as dotenv from "dotenv";
import Productresolvers from "./resolvers/ProductResolvers";

dotenv.config();
console.log(process.env);

const sequalize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

// import models into sequalize instance
initModels(sequalize);

const server = new ApolloServer({
  typeDefs,
  resolvers: Productresolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
