import Lobby from "../Database/Models/Lobby";
import {fn} from "sequelize";

export default async (io, socket, user, data) => {
  const randomLobby = await Lobby.findOne({where: {private: false}, order: [[fn('RAND', '')]]});
  if (!randomLobby) {
    console.error('No lobbies were found!');
    return;
  }

  socket.join(randomLobby.id);
  console.log('Lobby joined: ' + randomLobby.id);
}
