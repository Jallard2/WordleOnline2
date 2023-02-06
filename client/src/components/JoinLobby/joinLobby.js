import React from "react";
import './joinLobby.css'
import { Link } from 'react-router-dom';
import { sockets } from '../Constants/constants'

const socket = sockets;
export default function JoinLobby() {
  return (
    <div className="joinLobbyContainer">
      <h2 className="headings">Join A Lobby</h2>
      <div className="formStuffs">
      <form>
        <input autoComplete="off" type="text" id="lobbyName" placeholder="Lobby Name" className="forms"></input>
        <br></br>
        <Link to="/Waiting-For-Players"><button className="WaitingForPlayerss" onClick={joinLobbyRequest}>Join Lobby</button></Link>
      </form>
      </div>
    </div>
  );
}



function joinLobbyRequest() {
  let lobbyName = document.getElementById('lobbyName').value;
  console.log(lobbyName);
  socket.emit('joinLobby', lobbyName);
}