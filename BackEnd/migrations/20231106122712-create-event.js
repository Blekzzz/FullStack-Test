'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      proposedDate1: {
        type: Sequelize.DATE
      },
      proposedDate2: {
        type: Sequelize.DATE
      },
      proposedDate3: {
        type: Sequelize.DATE
      },
      proposedLocation: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      confirmedDate: {
        type: Sequelize.DATE
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      vendorUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};