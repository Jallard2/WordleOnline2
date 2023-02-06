const fs = require('fs');

async function lobbyUpdater(name) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    let data = await JSON.parse(rawdata);
    // data.Lobbies.length = 0; // Remove this for production
    let newLobby = {"Name":name.toUpperCase(), "Players":0, "Status":"Creation", "Mode":"", "Word":"", "Host":"", "Ids":{}}
    data.Lobbies.push(newLobby)
    await fs.promises.writeFile('./Lobbies.json', JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
    });
}

async function lobbyAvailable(name) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    let data = await JSON.parse(rawdata);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === name.toUpperCase()) {
            return false;
        }
    }
    return true;
}

async function lobbyStarted(name) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    let data = JSON.parse(rawdata);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === name.toUpperCase() && data.Lobbies[i].Status !== "Creation") {
            return true;
        }
    }
    return false;
}

async function addPlayer(name, socketID) {
    if (socketID === null) {
        return -1;
    }
    let rawdata = fs.readFileSync('./Lobbies.json');
    // console.log("Rawdata", rawdata);
    let data = await JSON.parse(rawdata);
    // console.log("Data Before", data);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === name.toUpperCase()) {
            data.Lobbies[i].Players = data.Lobbies[i].Players + 1;
            // console.log(data.Lobbies[i].Ids);
            data.Lobbies[i].Ids[socketID] = "";
        }
    }
    // console.log("Data After", data);
    await fs.promises.writeFile('./Lobbies.json', JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
    });
}

async function setHost(name, socketID) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    // console.log("Rawdata", rawdata);
    let data = await JSON.parse(rawdata);
    // console.log("Data Before", data);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === name.toUpperCase()) {
            data.Lobbies[i].Host = socketID;
        }
    }
    // console.log("Data After", data);
    await fs.promises.writeFile('./Lobbies.json', JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
    });
}

async function getHost(name) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    // console.log("Rawdata", rawdata);
    let data = await JSON.parse(rawdata);
    // console.log("Data Before", data);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === name.toUpperCase()) {
            return data.Lobbies[i].Host;
        }
    }
}

async function findSocketID(socketID) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    let data = await JSON.parse(rawdata);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (Object.keys(data.Lobbies[i].Ids).includes(socketID)) {
            return data.Lobbies[i].Name;
        }
    }
    return null;
}

async function updateName(socketName, socketID) {
    let rawdata = fs.readFileSync('./Lobbies.json');
    let data = await JSON.parse(rawdata);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === await findSocketID(socketID)) {
            data.Lobbies[i].Ids[socketID] = socketName;
        }
    }
    // console.log("Data After", data);
    await fs.promises.writeFile('./Lobbies.json', JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
    });
}

async function getAllPlayersByLobby(name) {
    console.log("Here");
    let rawdata = fs.readFileSync('./Lobbies.json');
    let data = await JSON.parse(rawdata);
    for (let i = 0; i < data.Lobbies.length; i++) {
        if (data.Lobbies[i].Name.toUpperCase() === name.toUpperCase()) {
            console.log("Found Lobby");
            return data.Lobbies[i].Ids;
        }
    }
}


module.exports = {
    lobbyUpdater,
    lobbyAvailable,
    lobbyStarted,
    addPlayer,
    setHost,
    getHost,
    updateName,
    findSocketID,
    getAllPlayersByLobby,
};