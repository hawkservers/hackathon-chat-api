import Lobby from "../Database/Models/Lobby";
import {fn, literal} from "sequelize";

export default async (io, socket, user, data) => {
  const randomLobby = await Lobby.findOne({where: {private: false}, order: literal('RAND()')});
  if (!randomLobby) {
    socket.emit('notify', {
      type: 'danger',
      message: 'No lobbies were found!'
    });
    return;
  }

  socket.emit('lobby.join', {
    success: true,
    slug: randomLobby.slug
  });
}
