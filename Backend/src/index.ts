import { Sequelize } from "sequelize";
import { initModels, product, productCreationAttributes } from "./models/init-models";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
const typeDefs = readFileSync("./src/product.graphql").toString("utf-8");

import * as dotenv from "dotenv";

dotenv.config();
console.log(process.env);

const sequalize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

// import models into sequalize instance
initModels(sequalize);

var messageHapus = {
  message: "Berhasil Hapus Data",
};

const resolvers = {
  Query: {
    products: async () => await product.findAll(),
  },

  Mutation: {
    // Get Details
    getDetailProduct: async (_parent: any, { id }: any) => {
      return await product.findByPk(id);
    },

    //Create Product
    createProduct: async (_parent: any, { name, stock, price }: any) => {
      const now = new Date();
      const deadline = now;
      deadline.setDate(now.getDate() + 4);

      const newProduct: productCreationAttributes = {
        name: name,
        stock: stock,
        price: price,
        created: now.toDateString(),
      };
      let createProduct = await product.create(newProduct);

      if (!createProduct) return null;
      return newProduct;
    },

    // Delete Todos
    deleteProduct: async (_parent: any, { id }: any) => {
      let delProduct = await product.destroy({
        where: {
          id: id,
        },
      });
      if (!delProduct) return null;
      return messageHapus;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
