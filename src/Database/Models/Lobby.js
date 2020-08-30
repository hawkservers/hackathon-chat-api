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
    defaultValue: false,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {sequelize: Connection, modelName: "lobby", createdAt: "created_at", updatedAt: "updated_at"});

export default Lobby;
