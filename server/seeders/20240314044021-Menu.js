'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = await axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=1e314406f5b24353a5b55035e1930258&minCalories=10&number=30',
    })

    // console.log(datas.data.results);

    datas.data.results.forEach(res => {
      res.name = res.title
      res.calories = res.nutrition.nutrients[0].amount
      res.price = Math.floor(Math.random() * 200000) + 20000;
      delete res.id
      delete res.imageType
      delete res.nutrition
      delete res.title
      res.createdAt = new Date()
      res.updatedAt = new Date()
    })

    let menus = datas.data.results
    // console.log(datas.data.results);
    await queryInterface.bulkInsert('Menus', menus)
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
    await queryInterface.bulkDelete('Menus', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
