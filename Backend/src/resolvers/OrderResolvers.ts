import { order, productCreationAttributes } from "../models/init-models";

var messageHapus = {
  message: "Berhasil Hapus Data",
};

const OrderResolvers = {
  Query: {
    orders: async () => await order.findAll(),
  },
};

export default OrderResolvers;
