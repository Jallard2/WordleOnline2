import React from 'react';
import './title.css'
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <div className="titleContainer">
      <h2 className="heading">Wordle With Friends</h2>
      <div className="buttons">
        <Link to="/Create-Lobby"><button className="CreateLobby">Create Lobby</button></Link>
        <Link to="/Join-Lobby"><button className="JoinLobby">Join Lobby</button></Link>
      </div>
    </div>
  );
}