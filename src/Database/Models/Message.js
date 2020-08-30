import {Model, DataTypes, literal} from "sequelize";
import Connection from '../Connection';
import User from "./User";
import {v4} from "uuid";
import Lobby from "./Lobby";

class Message extends Model {}
Message.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "users",
      key: "id"
    }
  },
  lobby_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "lobbies",
      key: "id"
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {sequelize: Connection, modelName: "message", createdAt: "created_at", updatedAt: "updated_at"});

Message.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user_id",
});

Message.belongsTo(Lobby, {
  targetKey: "id",
  foreignKey: "lobby_id"
});

export default Message;
