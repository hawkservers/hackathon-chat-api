import Message from '../Database/Models/Message';
import {validate} from 'uuid';

export default async (io, socket, user, msg) => {
  let lobbyId;
  for (let room in socket.rooms) {
    if (validate(room)) {
      lobbyId = room;
      break;
    }
  }

  if (!lobbyId) return;

  await Message.create({
    user_id: user.id,
    message: msg,
    lobby_id: lobbyId
  });

  io.to(lobbyId).emit('chat.message', {
    user,
    message: msg
  });
};
