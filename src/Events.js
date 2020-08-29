import {createServer} from 'http';
import * as socketIo from 'socket.io';
import uuid from 'uuid';
import {
  adjectives, animals, colors, countries, uniqueNamesGenerator
} from "unique-names-generator";

/**
 * @param {Express} app
 */
export default function loadSocket(app) {
  const server = createServer(app);
  const io = socketIo(server);

  const lobbies = new Map();
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    socket.on('authorize', () => {
      // todo: use data to auth a logged in user else make a guest

      socket.uid = uuid.v4();

      connectedUsers.set(socket.uid, {
        nickname: uniqueNamesGenerator({
          dictionaries: [animals, adjectives, colors, countries]
        }),
        lobby: null,
      });


      // Lobby events

      // Creating a lobby
      socket.on('lobby.create', (data) => {
        // Lets not allow more than one lobby with the same identifier
        if (typeof data.lobby !== "string" && !lobbies.has(data.lobby)) {
          return socket.emit('lobby.create', {
            error: {
              message: 'A lobby with that name already exists.',
              data: {
                lobby: data.lobby
              }
            }
          });
        }

        const user = connectedUsers.get(socket.uid);
        user.lobby = data.lobby;

        connectedUsers.set(socket.uid, user);
        lobbies.set(data.lobby, {
          users: [socket.uid],
          password: data.password ?? null,
        });

        socket.join(data.lobby);
      });

      // Join a lobby
      socket.on('lobby.join', (data) => {
        // todo add lobby join things
      });
    });
  });
}
