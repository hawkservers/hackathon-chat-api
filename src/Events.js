import {createServer} from 'http';
import * as socketIo from 'socket.io';
import {adjectives, colors, uniqueNamesGenerator} from "unique-names-generator";
import User from "./Database/Models/User";
import Events from './Events/index';

/**
 * @param {Express} app
 */
export default function loadSocket(app) {
  const server = createServer(app);
  const io = socketIo.listen(server);

  io.on('connection', async (socket) => {
    let {token} = socket.handshake.query;
    let user = await User.findOne({where: {auth_token: token}});
    if (user) {
      user = {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }
    } else {
      user = {
        username: uniqueNamesGenerator({
          dictionaries: [adjectives, colors]
        })
      }
    }

    // Load events
    for (let event in Events) {
      if (!Events.hasOwnProperty(event)) continue;

      let func = Events[event];
      if (!func) continue;

      socket.on(event, (...args) => {
        func(io, socket, user, ...args);
      });
    }
  });

  server.listen(6969);
}
