"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn("requests", "proyectName", "projectName");
  },
  down: async () => {}
};
