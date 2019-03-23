const dotenv = require('dotenv');
dotenv.config();
const environment = process.env
module.exports = {
    "type": environment.DB_CONNECTION || 'sqljs',
    "entities": ['src/entities/**/*.ts'],
    "migrations": ['migrations/**/*.ts'],
    "synchronize": true,
}