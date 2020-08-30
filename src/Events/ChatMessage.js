import Message from '../Database/Models/Message';

export default async (io, socket, user, msg) => {
  await Message.create({
    user_id: user.id,
    message: msg
  });

  io.emit('chat.message', {
    user,
    message: msg
  });
};
