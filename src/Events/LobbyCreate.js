import Lobby from "../Database/Models/Lobby";

/**
 * Create lobby event
 *
 * @param io
 * @param socket
 * @param user
 * @param {object} data
 * @param {string} data.slug
 * @param {boolean} data.private
 * @param {string} data.password
 * @returns {Promise<void>}
 */
export default async (io, socket, user, data) => {
  if (typeof data.slug !== "string" || (await Lobby.findOne({where: {slug: data.slug}}))) {
    console.error('Lobby already exists');
    return;
  }

  const lobby = await Lobby.create({
    slug: data.slug,
    private: data.private || false,
    password: data.password
  });

  socket.emit('lobby.join', lobby.slug);
}
