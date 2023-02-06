const lobbyWorker = require('./lobbyFunctions');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');
const { findSocketID } = require('./jsonWorker');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let clientNumber = 0;

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    clientNumber++;
    console.log(`${socket.id} just connected!`);
    socket.emit("serverMsg", clientNumber);
    socket.join('Title-Screen');

    socket.on('createNewLobby', async (name) => {
      let output = await lobbyWorker.newLobby(name);
      if (output === 1 || output === 0) {
        socket.join(name.toUpperCase());
        await lobbyWorker.addPlayer(name, socket.id);
        await lobbyWorker.setHost(name, socket.id)
        // await socketCounter(name);
        await emitData(name, socket);
      }
    });

    socket.on('joinLobby', async (name) => {
      name = name.toUpperCase();
      let output = await lobbyWorker.joinLobby(name);
      if (output === 0) {
        socket.join(name);
        console.log("Adding Player");
        await lobbyWorker.addPlayer(name, socket.id);
        await socketCounter(name);
        await emitData(name, socket);
        
      }
    });

    socket.on('playerName', async (playerName) => {
      await lobbyWorker.updateName(playerName, socket.id);
      let name = await findSocketID(socket.id);
      socketIO.to(name).emit('playerNameUpdate', await allPlayersNames(name))
    })

    socket.on('disconnect', () => {
      console.log(`A user disconnected`);
      clientNumber--;
    });
});

async function socketCounter(name) {
  let counter = 0;
  let sockets = await socketIO.in(name.toUpperCase()).fetchSockets();
  sockets.forEach(socket => {
    counter++;
  })
  console.log(counter);
  return counter;
}

async function isHost(name, socketID) {
  name = name.toUpperCase();
  let potentialID = await lobbyWorker.getHost(name);
  if (potentialID === socketID) {
    // console.log("Host Found");
    return true;
  }
  console.log("Not The Host");
  return false;
}

async function allPlayersNames(name) {
  name = name.toUpperCase();
  let namesList = await lobbyWorker.getAllPlayersByLobby(name);
  console.log("Names List: " + namesList);
  return namesList;
}

async function emitData(name, socket = null) {
  socketIO.to(name.toUpperCase()).emit('count', await socketCounter(name));
  socketIO.to(name.toUpperCase()).emit('lobbyName', name);
  socketIO.to(socket.id).emit('host', await isHost(name, socket.id));
}

// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Hello world',
//   });
// });

// app.post('/newLobby', (req, res) => {
//   console.log("req.body:", req.body);
//   console.log("Lobby Name:", req.body.lobbyName);
//   const jsonWorker = require('./jsonWorker');
//   if (jsonWorker.lobbyAvailable(req.body.lobbyName)) {
//     jsonWorker.lobbyUpdater(req.body.lobbyName);
//   }
//   else {
//     res.sendStatus(403);
//     console.log("Stopped A Lobby From Being Created");
//   }
// });

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});