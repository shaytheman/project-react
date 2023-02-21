import React from 'react'
import { useState } from 'react';
import * as gFunctions from '../functions/globalFunctions'


export const PlayerNameSelector = ({ setPlayersState, toggleVisibility, isTherePlayers, resetStats }) => {
    const [playerX, setplayerX] = useState('')
    const [playerO, setPlayerO] = useState('')
    /**
     * Require user to add names
     * If there names already prompt the user to empty the file 
     * Theres a button that skips if there a file saved
     * @param {*Event} e 
     * @returns 
     */
    const Submit = async (e) => {
        e.preventDefault();// make sure the page wont be reloded
        if (!playerX || !playerO) {
            alert("Please enter a name for both players");
            return;
        }

        if (isTherePlayers && gFunctions.confirmation("It will delete the save file!!!!")) {
            resetStats()
            setPlayersState(playerX, playerO)
            toggleVisibility('PlayerNameSelector', 'Game');
        }
        else if (!isTherePlayers) {
            setPlayersState(playerX, playerO)
            toggleVisibility('PlayerNameSelector', 'Game');
        }
    };

    return (
        <>
            <h1 id="subject">Tic Tac Toe</h1>
            <form onSubmit={Submit}>
                <div className="flexbox1">
                    <div className="chooseName">
                        <h2>X</h2>
                        <h5>Player Name:</h5>
                        <input
                            type="text"
                            placeholder='PLAYER X'
                            name="input0"
                            // each time a user type it will update the playerO/2 state(varible)
                            value={playerX}
                            onChange={(e) => setplayerX(e.target.value)}>
                        </input>
                    </div>
                    <div className="chooseName">
                        <h2>O</h2>
                        <h5>Player Name:</h5>
                        <input type="text"
                            placeholder='PLAYER O'
                            name="input1"
                            value={playerO}
                            onChange={(e) => setPlayerO(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div>
                    <button type="submit">Click me to start the game</button>
                </div>
            </form>
            {isTherePlayers && (<div className="flexbox2" >
                <div type="button" style={{ width: '185px' }} onClick={(e) => toggleVisibility('PlayerNameSelector', 'Game')}>There is a save file.<br></br><br></br>You can load to it.</div>
            </div>)}
        </>
    )
}
