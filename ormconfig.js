const dotenv = require('dotenv');
dotenv.config();
const environment = process.env
module.exports = {
    "type": environment.DB_CONNECTION || 'sql.js',
    "entities": ['src/entities/**/*.ts'],
    "subscribers": ['src/orm/subscribers/**/*.ts'],
    "migrations": ['migrations/**/*.ts'],
}