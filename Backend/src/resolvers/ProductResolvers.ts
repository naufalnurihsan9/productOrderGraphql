import { product, productCreationAttributes } from "../models/init-models";

var messageHapus = {
  message: "Berhasil Hapus Data",
};

const Productresolvers = {
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

    updateProduct: async (_parent: any, { id, name, stock, price }: any) => {
      const now = new Date();
      const deadline = now;
      deadline.setDate(now.getDate() + 4);

      const updateProduct: productCreationAttributes = {
        name: name,
        stock: stock,
        price: price,
        created: now.toDateString(),
      };

      const updatedata = await product.update(updateProduct, {
        where: {
          id: id,
        },
      });

      if (!updatedata) return null;
      return updatedata;
    },
  },
};

export default Productresolvers;
