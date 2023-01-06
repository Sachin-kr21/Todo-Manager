"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Todos", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: 5,
          msg: "Length should be greater than 5!",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Todos", "title", {
      type: Sequelize.STRING,
    });
  },
};
