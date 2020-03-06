'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users",'plan_id',{ // adiciona col na tabela users com nome 'plan_id'
      type: Sequelize.DataTypes.INTEGER, // tipo da coluna
      references:{ 
        model: 'Plans', // associando ou criando relacionamento da coluna com a tabela plans
        key: 'id' // assiciando com a coluna 'id' da tabela 'plans'
      },
      //PROTEÇÕES 
      onDelete: 'SET NULL', // SE O PLANO FOR DELETA DO SETAR 'null' na coluna 'plan_id' da tabela 'users'
      onUpdate: 'CASCADE'  // SE O NUMERO DO PLANO FOR ALTERADO MUDA O NUMERO ONDE ESTIVER SENDO ULTILIZADO
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
