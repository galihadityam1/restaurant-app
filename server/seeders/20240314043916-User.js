"use strict";
const fs = require("fs");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = fs.readFileSync("./data/users.json", 'utf-8');
    users = JSON.parse(users)

    users.forEach(res => {
      res.password = bcrypt.hashSync(res.password, bcrypt.genSaltSync(10))
      res.createdAt = new Date()
      res.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', users);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
