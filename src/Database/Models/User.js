import {Model, DataTypes, literal} from "sequelize";
import Connection from '../Connection';
import {v4} from "uuid";

class User extends Model {}
User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4
  },
  username: DataTypes.STRING,
  avatar: DataTypes.STRING,
  auth_token: DataTypes.STRING
}, {sequelize: Connection, modelName: "user"});

export default User;
