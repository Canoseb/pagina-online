const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pagweb', 'Sebastian', '123', {
    host: 'localhost',
    dialect: 'mysql', 
    dialectModule: require('mysql2') 
});

module.exports = sequelize;