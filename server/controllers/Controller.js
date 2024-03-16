const { Menu, Order, User } = require("../models/index.js");
const ImageKit = require("imagekit");
const midtransClient = require("midtrans-client");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { io } = require("../app.js");

class Controller {
  static async getAllMenu(req, res, next) {
    try {
      let { filter, sort, page, search } = req.query;
      let sequelizeQuery = {
        where: {},
      };

      if (search) {
        sequelizeQuery.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (filter) {
        if (filter.length > 1) {
          sequelizeQuery.where.typeId = {
            [Op.or]: filter,
          };
        } else {
          sequelizeQuery.where.typeId = filter;
        }
      }

      if (sort) {
        const order = sort[0] === "-" ? "DESC" : "ASC";
        const sortBy = order === "DESC" ? sort.slice(1) : sort;
        sequelizeQuery.order = [[sortBy, order]];
      }

      let limit = 10;
      let pageNumber = 1;

      if (page) {
        // maksimal data per page
        if (page.size) {
          limit = +page.size;
          sequelizeQuery.limit = limit;
        } else {
          sequelizeQuery.limit = limit;
        }

        // data yang di skip (untuk halaman selanjutnya)
        if (page.number) {
          pageNumber = +page.number;
          sequelizeQuery.offset = limit * (pageNumber - 1);
        } else {
          sequelizeQuery.offset = limit * (pageNumber - 1);
        }
        
      } else {
        sequelizeQuery.limit = limit;
        sequelizeQuery.offset = limit * (pageNumber - 1);
      }

      let { count, rows } = await Menu.findAndCountAll(sequelizeQuery);

      let menu = await Menu.findAll(sequelizeQuery);

      if (menu.length === 0) {
        throw { name: "NoData" };
      }

      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;
      let menu = await Menu.findOne({
        where: { id },
      });

      if (!menu) {
        throw { name: "NoData" };
      }
      res.status(200).json({ menu });
    } catch (error) {
      next(error);
    }
  }

  static async postMenu(req, res, next) {
    try {
      let menu = await Menu.create({
        ...req.body,
      });

      res.status(201).json({ message: "Menu has been create", menu });
    } catch (error) {
      console.log(error, "<< ini errornya");
      next(error);
    }
  }

  static async editMenu(req, res, next) {
    try {
      let { id } = req.params;
      //   console.log(id);
      let data = await Menu.update({ ...req.body }, { where: { id: id } });

      if (data[0] === 0) {
        throw { name: "NoData" };
      }

      let menu = await Menu.findOne({
        where: { id: id },
      });

      res.status(200).json({ message: "Menu has been edited", menu });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMenu(req, res, next) {
    try {
      let data = await Menu.findOne({
        where: { ...req.params },
      });

      if (!data) {
        throw { name: "NoData" };
      }

      data.destroy({
        where: { ...req.params },
      });

      res.status(200).json({ message: "lodging successfully deleted", data });
    } catch (error) {
      next(error);
    }
  }

  static async addOrder(req, res, next) {
    try {
      let UserId = req.user.id;
      // console.log(req.params);
      let MenuId = req.params.id;

      let menu = await Menu.findByPk(MenuId);
      // let totalOrder = await Order.findOne({ where: { UserId, MenuId } });
      // console.log(totalOrder);
      // if (totalOrder){
      //   totalOrder.update({ amount: totalOrder.amount + 1})
      // }
      // let MenuId = req.params.id;
      // console.log(menu);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
      });

      let order = await Order.create({
        UserId,
        MenuId,
        price: menu.price,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" +
            order.id +
            (process.env.NODE_ENV === "production" ? "" : "_dev"),
          gross_amount: order.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: req.user.fullName,
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      let transactionUrl = transaction.redirect_url;
      let orderId = parameter.transaction_details.order_id;

      // console.log(transaction);

      await order.update({
        orderId,
      });

      if (transactionToken) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "galihadityam1@gmail.com",
            pass: "hzwl evhq ovgn eyqm",
          },
        });
        async function main() {
          const info = await transporter.sendMail({
            from: "galihadityam1@gmail.com",
            to: `bulldog.07.id@gmail.com`,
            subject: "Order Success",
            text: "Your Order was successful create",
          });

          console.log("Message sent: %", info.messageId);
        }
        main().catch(console.error);
      }

      res.json({
        message: "Order Created",
        transactionToken,
        transactionUrl,
        orderId,
      });

      // res.status(201).json({ message: "Order has been create", order });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchPayment(req, res, next) {
    try {
      const { orderId } = req.body;

      const order = await Order.findOne({ where: { orderId } });

      if (!order) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (order.status === "paid") {
        return res.status(400).json({ message: "Booking alreay paid" });
      }

      const serverKey = process.env.SERVER_KEY_MIDTRANS;
      const base64server = Buffer.from(serverKey + ":").toString("base64");
      const response = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            Authorization: `Basic ${base64server}`,
          },
        }
      );

      if (
        response.data.transaction_status === "settlement" &&
        response.data.status_code === "200"
      ) {
        await order.update({ status: "paid" });
        io.emit("payment_success", { message: "Thank you for your payment" });
        res.json({ message: `Thank you for your payment` });
      } else {
        res.status(400).json({ message: `Please check your payment detail` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async editImage(req, res, next) {
    try {
      if (!req.file) {
        throw { name: "FileNeeded" };
      }

      let menu = await Menu.findOne({
        where: { ...req.params },
      });

      if (!menu) {
        throw { name: "NoData" };
      }

      const base64Image = req.file.buffer.toString("base64");
      const base64URL = `data:${req.file.mimetype};base64,${base64Image}`;

      let imagekit = new ImageKit({
        publicKey: "public_BvPyQYVAjIiPOFsjKdvmwGYIw6w=",
        privateKey: "private_Y4VWiivvPf5qwU6eZkH2B9LuOUA=",
        urlEndpoint: "https://ik.imagekit.io/zbcidgkzgm",
      });

      let imageURL = await imagekit.upload({
        file: base64URL, //required
        fileName: req.file.originalname, //required
        tags: ["tag1", "tag2"],
      });

      await menu.update({ image: imageURL.url });

      // console.log(imageURL);
      res.status(200).json({ message: "Berhasil mengubah image", menu });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
