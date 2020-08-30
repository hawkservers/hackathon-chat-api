import {Model, DataTypes} from "sequelize";
import Connection from '../Connection';
import {v4} from "uuid";

class Lobby extends Model {}
Lobby.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {sequelize: Connection, modelName: "lobby"});

export default Lobby;
