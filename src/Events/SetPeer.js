import Lobby from "../Database/Models/Lobby";

/**
 * Joins a specific lobby
 *
 * @param io
 * @param socket
 * @param user
 * @param {object} data
 * @param {string} [data.peer]
 * @returns {Promise<void>}
 */
export default async (io, socket, user, data) => {
  if (!data.peer) {
    return;
  }

  console.log(data.peer);

  user.peer = data.peer;
}
