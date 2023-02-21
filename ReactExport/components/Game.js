import React, { useState } from 'react'
import * as gFunctions from '../functions/globalFunctions'
import { useEffect } from 'react'


const Game = ({ players,
    playersScore, setPlayersScoreState,
    gameStatus, setGameStatusState,
    stackOrderIndex, setStackOrderIndexState,
    toggleVisibility,
    saveStats
}) => {

    const [gameStatusShow, setGameStatusShow] = useState(gameStatus)
    const [playersScoreShow, setPlayersScoreShow] = useState(playersScore)
    const [subject, setSubject] = useState("Tic Tac Toe")
    //stack implimintation for undos
    const [stackOrderIndexShow, setStackOrderIndexShow] = useState(stackOrderIndex)
    //a way to toggle the clickble button
    const [pointerEventsValue, setPointerEventsValue] = useState('auto');

    useEffect(() => { console.log(gameStatus)}, []);
    /**
     * IMPORTANT TO NOTICE!!!!
     * for some reason if not passing an event it includes a button click from another button click
     */
    /**
     * Make a play when a user press on the button
     * @param {*} event 
     * @param {*} i Index
     */
    const clickGame = (event, i) => {
        const newGameStatus = gFunctions.nextMove(i,
            gameStatusShow,
            players,
            setSubject,
            playersScoreShow, setPlayersScoreShow,
            setPointerEventsValue
        )
        const newstackOrderIndex = [...stackOrderIndexShow, i]
        setGameStatusShow(newGameStatus)
        setStackOrderIndexShow(newstackOrderIndex)
    }
    /**
     * pops from the StackOrder array and add empty space to the gameStatus array
     * @param {*} event 
     */
    const clickUndo = (event) => {
        const newGameStatus = [...gameStatusShow]
        const newStackOrderIndex = [...stackOrderIndexShow]
        newGameStatus[newStackOrderIndex.pop()] = '\u00A0'
        setGameStatusShow(newGameStatus)
        setStackOrderIndexShow(newStackOrderIndex)
    }

    const clickGoBack = (event) => {
        if (gFunctions.confirmation("Are you sure you want to press that button??"))
            toggleVisibility('Game', 'PlayerNameSelector')
    }
    const clickRestart = (event) => {
        if (gFunctions.confirmation("Are you sure you want to press that button??")) {
            setGameStatusShow(['\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0', '\u00A0'])
            //setPlayersScoreShow({ scoreX: 0, scoreO: 0 })
            setSubject("Tic Tac Toe")
            setPointerEventsValue('auto')
            setStackOrderIndexShow([])
            for (let i = 0; i < 9; i++) {
                document.getElementById(i).style.color = "#1d1c1c"
            }
        }

    }
    /**
     * Will call the HTTP POST method from app.js
     * Replace the current file with the game data
     * @param {*} event 
     */
    const updateSaveFile = (event) => {
        const newData = {
            players: (players),
            playersScore: playersScoreShow,
            gameStatus: gameStatusShow,
            stackOrderIndex: stackOrderIndexShow
        }
        console.log("SAVING")
        console.log(newData)
        saveStats(newData)

        alert("Saved Game")
    }


    return (
        <>
            <h1 id="subject">{subject}</h1>
            <div className="flexbox2">
                {[0, 1, 2].map(i => (
                    <div
                        id={i}
                        key={i}
                        type="button"
                        style={{
                            borderRadius:
                                i === 0 ? '15px 0 0 0' :
                                    i === 2 ? '0 15px 0 0' : '',
                            pointerEvents: pointerEventsValue
                        }}
                        onClick={(event) => clickGame(event, i)}>
                        {gameStatusShow[i]}
                    </div>
                ))}
            </div>
            <div className="flexbox2">
                {[3, 4, 5].map(i => (
                    <div
                        id={i}
                        key={i}
                        type="button"
                        style={{ pointerEvents: pointerEventsValue }}
                        onClick={(event) => clickGame(event, i)}>
                        {gameStatusShow[i]}
                    </div>
                ))}
            </div>
            <div className="flexbox2">
                {[6, 7, 8].map(i => (<div id={i} key={i} type="button"
                    style={{
                        borderRadius:
                            i === 6 ? '0 0 0 15px' :
                                i === 8 ? '0 0 15px 0' : '',
                        pointerEvents: pointerEventsValue
                    }}
                    onClick={(event) => clickGame(event, i)}>
                    {gameStatusShow[i]}
                </div>
                ))}
            </div>
            <div className="flexbox2">
                {(stackOrderIndexShow.length > 0) && (pointerEventsValue !== "none") &&
                    <div
                        className="option"
                        id="back"
                        onClick={(event) => clickUndo(event)}
                        style={{ marginBottom: '750px' }}>
                        Undo
                    </div>
                }
                <div className="score" id="X">X<br></br>{players.nameX}<br></br>{playersScoreShow.scoreX}</div>
                <div className="score">Score</div>
                <div className="score" id="O">O<br></br>{players.nameO}<br></br>{playersScoreShow.scoreO}</div>
                {(stackOrderIndexShow.length > 0) &&
                    <div
                        className="option"
                        id="restart"
                        style={{ marginBottom: '500px' }}
                        onClick={(event) => clickRestart(event)} >
                        Restart
                    </div>}
                <div
                    className="option"
                    id="restart"
                    onClick={(event) => clickGoBack(event)} >
                    Change Players
                </div>
                {(pointerEventsValue !== "none") && (<div
                    className="option"
                    id="restart"
                    style={{ marginBottom: '0px', color: "pink" }}
                    onClick={(event) => updateSaveFile(event)} >
                    Save Game
                </div>)}
            </div>

        </>
    )
}

export default Game