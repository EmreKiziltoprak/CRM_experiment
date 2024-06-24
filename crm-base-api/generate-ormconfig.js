require('dotenv').config();
const fs = require('fs');

const ormConfig = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ["src/models/**/*.ts"]
};

fs.writeFileSync('ormconfig.json', JSON.stringify(ormConfig, null, 2));
console.log('ormconfig.json has been generated');
