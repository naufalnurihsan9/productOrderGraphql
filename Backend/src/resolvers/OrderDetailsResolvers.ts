import { orderdetail } from "../models/init-models";

var messageHapus = {
  message: "Berhasil Hapus Data",
};

const OrderDetailsResolvers = {
  Query: {
    orderDetails: async () => await orderdetail.findAll(),
  },
};

export default OrderDetailsResolvers;
