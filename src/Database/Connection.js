import {Sequelize} from "sequelize";
import {mysql} from '../../config.json';

const sequelize = new Sequelize({
  dialect: "mysql",
  host: mysql.host,
  username: mysql.user,
  password: mysql.password,
  database: mysql.database,
  port: mysql.port
});

export default sequelize;

sequelize.sync()
  .then(() => {
    console.log('Sequelize synced');
  }).catch(console.error);
