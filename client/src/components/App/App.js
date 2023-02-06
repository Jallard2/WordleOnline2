import './App.css';

import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sockets } from '../Constants/constants'

import Title from '../Title/title';
import JoinLobby from '../JoinLobby/joinLobby';
import CreateLobby from '../CreateLobby/createLobby';
import WaitingForPlayers from '../WaitingForPlayers/waitingForPlayers';

const socket = sockets;
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className = "mainScreen">
          <div className = "content">
            <Routes>
              <Route path="/" element={<Title/>}/>
              <Route path="/Join-Lobby" element={<JoinLobby/>}/>
              <Route path="/Create-Lobby" element={<CreateLobby/>}/>
              <Route path="/Waiting-For-Players" element={<WaitingForPlayers/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

let clientRoom;
socket.on('serverMsg', (data) => {
  console.log("Test", data);
  clientRoom = data;
})
