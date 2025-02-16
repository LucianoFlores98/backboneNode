'use strict';
// import {PUBLIC,PENSIONS,PRIVATE,RETIRED} from "../src/constants/segments"
const { PUBLIC, PENSIONS, PRIVATE, RETIRED } = require("../src/constants/segments.ts");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('Segments', null, {});
    await queryInterface.bulkInsert('Segments', [
      {
        segment: RETIRED,
        days_late_tc: 20,
        days_late_pp: 15,
        global_max_amount: 2000000,
        max_transaction_amount: 1000000,
        affectation: 30,
        global_indebtedness: 65,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        segment: PENSIONS,
        days_late_tc: 20,
        days_late_pp: 15,
        global_max_amount: 2000000,
        max_transaction_amount: 800000,
        affectation: 30,
        global_indebtedness: 65,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        segment: PUBLIC,
        days_late_tc: 5,
        days_late_pp: 5,
        global_max_amount: 2000000,
        max_transaction_amount: 800000,
        affectation: 25,
        global_indebtedness: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        segment: PRIVATE,
        days_late_tc: 5,
        days_late_pp: 5,
        global_max_amount: 2000000,
        max_transaction_amount: 800000,
        affectation: 20,
        global_indebtedness: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Segments', null, {});
  }
};
