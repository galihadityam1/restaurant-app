const { Menu, Order } = require("../models/index.js");

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
        }

        // data yang di skip (untuk halaman selanjutnya)
        if (page.number) {
          pageNumber = +page.number;
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
        let UserId = req.user.id
        let MenuId = req.params.id

        let order = await Order.create({
            UserId, MenuId
        })

      res.status(201).json({ message: "Order has been create", order });
    } catch (error) {
        console.log(error);
        next(error)
    }
  }
}

module.exports = Controller;
