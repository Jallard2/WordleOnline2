import React from "react";
import './createLobby.css'
import { Link } from 'react-router-dom';
import { sockets } from '../Constants/constants'
var $ = require( "jquery" );

const socket = sockets;
export default function CreateLobby() {
  return (
    <div className="createLobbyContainer">
      <h2 className="heading">Create A Lobby</h2>
      <div className="formStuff">
      <form>
        <input autoComplete="off" type="text" id="lobbyName" placeholder="Lobby Name" className="form"></input>
        <br></br>
        {/* <button id="submit" onClick={sendingRequest} className="WaitingForPlayers">Create Lobby</button> */}
        <Link id="testLink" to="/Waiting-For-Players"><button id="createNewLobbyButton" onClick={createLobbyRequest} className="WaitingForPlayers">Create Lobby</button></Link>
      </form>
      </div>
    </div>
  );
}

function createLobbyRequest() {
  let lobbyName = document.getElementById('lobbyName').value;
  console.log(lobbyName);
  socket.emit('createNewLobby', lobbyName);
}


function sendingRequest(event) {
  var redirect = true;
  $.post("http://localhost:4000/newLobby",
    {
        lobbyName: document.getElementById('lobbyName').value
    },
    function (data, status) {
      console.log("Data", data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("Error received:", errorThrown);
      console.log("Stopping the post request.");
      redirect = false;
      return;
    }
)}

async function sendingRequestNew(event) {
  event.preventDefault();
  const body = {
    lobbyName: "Testing",
    lobbyPassword: "Final"
  }
  console.log(body);
  try {
    const reponse = await fetch("http://localhost:4000/newLobby", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await reponse.json();
    console.log("Data", data);
  }
  catch (error) {
    console.log("Error:", error);
    console.log("Stopping the POST request");
  }
}



