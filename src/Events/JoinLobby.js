import Lobby from "../Database/Models/Lobby";

/**
 * Joins a specific lobby
 *
 * @param io
 * @param socket
 * @param user
 * @param {object} data
 * @param {string} data.lobby
 * @param {string} [data.password]
 * @returns {Promise<void>}
 */
export default async (io, socket, user, data) => {
  const lobby = await Lobby.findOne({where: {slug: data.lobby}});
  if (!lobby) {
    socket.emit('notify', {
      type: 'danger',
      message: 'A lobby with this slug does not exist.'
    });
    return;
  }

  if (lobby.private && (lobby.password !== data.password)) {
    socket.emit('notify', {
      type: 'danger',
      message: 'Invalid password.'
    })
    return;
  }

  socket.join(lobby.id);
  socket.emit('lobby.join', {
    success: true,
    slug: lobby.slug
  });

  socket.to(lobby.id).emit('lobby.user.join', user);

  socket.on('disconnect', () => {
    socket.to(lobby.id).emit('lobby.user.disconnected', user);
  });
}
