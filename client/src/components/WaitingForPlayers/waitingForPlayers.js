import React from "react";
import './waitingForPlayers.css'

import { sockets } from '../Constants/constants'
const socket = sockets;
let isHost = false;
export default function WaitingForPlayers() {
  return (
    <div className="waitingForStartContainer" id="wrapper">
      <h2 className="heading">Waiting For Game To Start</h2>
      <h4 className="LobbyName" id="lobbyName">Lobby Name: </h4>
      <h4 className="PlayerCount" id="playerCount">Players In The Game: </h4>
      <div className="formStuff">
        <form>
          <input autoComplete="off" type="text" id="playerName" placeholder="Enter Name" className="form"></input>
          <button id="submitName" onClick={submittedName} className="submitName">Submit Name</button>
        </form>
      </div>
      <div className="options" id="hostOptions">
        <form id="hostForm">
          <input type="radio" id="radioClick" value=" Rotate" name="WordChoice"></input>
          <label htmlFor="rotateClick"> Rotate</label>
          <br></br>
          <input type="radio" id="botClick" value=" Bot Choice" name="WordChoice"></input>
          <label htmlFor="botClick"> Bot Choice</label>
        </form>
      </div>
      <h4 className="allPlayers">Player Names</h4>
      <p className="allPlayersNames" id="playersList"></p>
      <div id="startButton">
        <button id="startLobby" onClick={startLobby} className="startLobby">Start Lobby</button>
      </div>
    </div>
  );
}

window.onload = function() {
  socket.on("count", (data) => {
    let dataString = document.getElementById("playerCount");
    dataString.innerHTML = `Players In The Game: ${data}`;
  })
  socket.on("lobbyName", (data) => {
    let dataString = document.getElementById("lobbyName");
    dataString.innerHTML = `Lobby Name: ${data}`;
  })
  socket.on("playerNameUpdate", (data) => {
    let dataString = document.getElementById("playersList");
    let allNames = "";
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      allNames += `${data[i]}\n\n`;
    }
    dataString.innerHTML = allNames;
  })
  socket.on("host", (data) => {
    if (data !== true) {
      let data = document.getElementById("hostOptions");
      data.setAttribute("hidden", "hidden");
      data = document.getElementById("startButton");
      data.setAttribute("hidden", "hidden");
    }
  })
};

// window.onchange = function() {
  
// }

function submittedName(e) {
  e.preventDefault();
  let playerName = document.getElementById('playerName').value;
  socket.emit("playerName", playerName);
}

function startLobby(e) {
  e.preventDefault();
  console.log("Started");
}
