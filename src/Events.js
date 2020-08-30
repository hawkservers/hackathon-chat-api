import {createServer} from 'http';
import * as socketIo from 'socket.io';
import {adjectives, colors, uniqueNamesGenerator} from "unique-names-generator";
import User from "./Database/Models/User";
import Events from './Events/index';
import {app as Config} from "../config.json";

/**
 * @param {Express} app
 */
export default function loadSocket(app) {
  const server = createServer(app);
  const io = socketIo.listen(server);

  io.on('connection', async (socket) => {
    let {token} = socket.handshake.query;
    let user = await User.findOne({where: {auth_token: token}, attributes: {exclude: ['auth_token']}});
    if (!user) {
      user = {
        username: uniqueNamesGenerator({
          dictionaries: [adjectives, colors],
          style: "capital",
          separator: ""
        })
      }
    }

    socket.emit('user', user);

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

  server.listen(Config.ws_port);
}
