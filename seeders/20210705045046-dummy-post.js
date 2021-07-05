'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('posts', [{
          title: 'title 1',
          content: 'content 1',
          category_id: 1
        },
        {
          title: 'title 2',
          content: 'content 2',
          category_id: 1
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
