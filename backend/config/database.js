const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
        // Uncomment the following options if you need to configure SSL for MySQL
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        // },
    },
    logging: console.log, // Optional: log SQL queries
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
