const jsonWorker = require('./jsonWorker');

// Returning Integer Values
// 1: Lobby can be created and joined
// 0: Lobby can be joined but not created
// -1: Lobby cannot be joined or created


async function newLobby(name) {
    if (await jsonWorker.lobbyAvailable(name)) {
        await jsonWorker.lobbyUpdater(name);
        return 1;
    }
    else if (await jsonWorker.lobbyStarted(name)) {
        console.log("Stopped A Lobby From Being Created. Lobby In Progress. Cannot Join");
        return -1;
    }
    else {
        console.log("Lobby Already Created. Joining Lobby Instead");
        return 0;
    }
}

async function joinLobby(name) {
    if (!await jsonWorker.lobbyStarted(name)) {
        console.log("Joining Lobby");
        return 0;
    }
    else {
        console.log("You cannot join this lobby as it has already started");
        return -1;
    }
}

async function addPlayer(name, socketID = null) {
    await jsonWorker.addPlayer(name, socketID);
}

async function setHost(name, socketID) {
    await jsonWorker.setHost(name, socketID);
}

async function getHost(name) {
    console.log(await jsonWorker.getHost(name));
    return await jsonWorker.getHost(name);
}

async function updateName(socketName, socketID) {
    await jsonWorker.updateName(socketName, socketID);
}

async function getAllPlayersByLobby(name) {
    let data = await jsonWorker.getAllPlayersByLobby(name);
    let arrayVal = [];
    for (let i in data) {
        arrayVal.push(data[i]);
    }
    return arrayVal
    ;
}

async function findSocketID(socketID) {
    return await jsonWorker.findSocketID(socketID);
}

module.exports = {
    newLobby,
    joinLobby,
    addPlayer,
    setHost,
    getHost,
    updateName,
    getAllPlayersByLobby,
    findSocketID,
};