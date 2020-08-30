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
    console.error('Lobby not found!');
    return;
  }

  if (lobby.private && (lobby.password !== data.password)) {
    console.error('Passwords don\'t match!');
    return;
  }

  console.log('Joining lobby: ' + lobby.id);
}