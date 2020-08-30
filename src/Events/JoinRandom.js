import Lobby from "../Database/Models/Lobby";
import {fn} from "sequelize";

export default async (io, socket, user, data) => {
  const randomLobby = await Lobby.findOne({where: {private: false}});
  if (!randomLobby) {
    console.error('No lobbies were found!');
    return;
  }

  socket.emit('lobby.join', randomLobby.slug);
}
