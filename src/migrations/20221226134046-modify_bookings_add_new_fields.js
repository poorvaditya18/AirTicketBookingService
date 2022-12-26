"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // adding column to our table "Bookings"
    await queryInterface.addColumn("Bookings", "noOfSeats", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

    await queryInterface.addColumn("Bookings", "totalCost", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // when you remove the migration those columns will also get removed
    await queryInterface.removeColumn("Bookings", "noOfSeats");
    await queryInterface.removeColumn("Bookings", "totalCost");
  },
};
