import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
const typeDefsproduct = readFileSync("./src/schema/product.graphql").toString("utf-8");
const typeDefsorder = readFileSync("./src/schema/order.graphql").toString("utf-8");

import * as dotenv from "dotenv";
import Productresolvers from "./resolvers/ProductResolvers";
import OrderResolvers from "./resolvers/OrderResolvers";

dotenv.config();
console.log(process.env);

const sequalize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

// import models into sequalize instance
initModels(sequalize);

const server = new ApolloServer({
  typeDefs: [typeDefsproduct, typeDefsorder],
  resolvers: [Productresolvers, OrderResolvers],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
