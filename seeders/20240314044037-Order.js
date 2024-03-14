'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let orders = fs.readFileSync('./data/order.json', 'utf-8')
    orders = JSON.parse(orders)

    orders.forEach(res => {
      res.status = 'waiting for payment'
      res.createdAt = new Date()
      res.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Orders', orders)
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
