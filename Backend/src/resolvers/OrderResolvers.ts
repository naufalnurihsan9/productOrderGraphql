import { order, orderCreationAttributes, orderdetail, orderdetailCreationAttributes } from "../models/init-models";
import { v4 as uuidv4 } from "uuid";

var messageorder = {
  message: "Berhasil Tambah Order",
};

var messageHapus = {
  message: "Berhasil Hapus Order",
};

const myuuid = uuidv4();

const OrderResolvers = {
  Query: {
    orders: async () => await order.findAll(),
  },
  Mutation: {
    // Get Details
    getDetailOrders: async (_parent: any, { id }: any) => {
      return await order.findByPk(id);
    },

    //Create Order
    CreateOrders: async (_parent: any, { productid, quantity, price, Order_id }: any) => {
      const now = new Date();
      const deadline = now;
      deadline.setDate(now.getDate() + 4);

      const newOrder: orderCreationAttributes = {
        transcode: myuuid,
        created: now.toDateString(),
      };

      const newOrderDetails: orderdetailCreationAttributes = {
        productid: productid,
        quantity: quantity,
        price: price,
        Order_id: Order_id,
      };

      let createOrder = await order.create(newOrder);
      let createOrderDetails = await orderdetail.create(newOrderDetails);

      if (!createOrder && !createOrderDetails) return null;
      return messageorder;
    },

    // Delete Product
    deleteOrder: async (_parent: any, { idOrder, idOrderDetail }: any) => {
      let delOrder = await order.destroy({
        where: {
          id: idOrder,
        },
      });

      let delOrderDetail = await orderdetail.destroy({
        where: {
          id: idOrderDetail,
        },
      });

      if (!delOrder && !delOrderDetail) return null;
      return messageHapus;
    },
  },
};

export default OrderResolvers;
