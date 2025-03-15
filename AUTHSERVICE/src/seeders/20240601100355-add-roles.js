'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_roles', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        RoleId: 1,
        UserId: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        RoleId: 2,
        UserId: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        RoleId: 3,
        UserId: 2
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
