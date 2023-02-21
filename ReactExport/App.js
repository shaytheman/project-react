import { useState } from 'react';
import { useEffect } from 'react'
import './App.css';
import Game from './components/Game';
import { StartMenu } from './components/StartMenu';
import { PlayerNameSelector } from './components/PlayerNameSelector';

/**
 * The main meat of react it is called in index.js
 * @returns Html body that will render
 */
function App() {

  /**
   * useState is Varibles
   */
  const [players, setPlayers] = useState({ nameX: "", nameO: "" })
  const [playersScore, setPlayersScore] = useState({ scoreX: 0, scoreO: 0 })
  //TODO Shoudve used stack for the pop function to do undo...
  const [gameStatus, setGameStatus] = useState(["\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0"])
  const [stackOrderIndex, setStackOrderIndex] = useState([])
  const [isVisible, setIsVisible] = useState({ StartMenu: true, PlayerNameSelector: false, Game: false });

  /**
   * The function ends in ",[]" means that it will excute when the component will initilize.
   * use to get data from NodeJS server.
   */
  useEffect(() => { fetchStats() }, []);

  /**
   * Sets all of relevent data to games
   * @param {*To add to States} data
   */
  const setAll = (data) => {
    setPlayers({ nameX: data.players.nameX, nameO: data.players.nameO })
    setPlayersScore({ scoreX: data.playersScore.scoreX, scoreO: data.playersScore.scoreO })
    setGameStatus(data.gameStatus)
    setStackOrderIndex(data.stackOrderIndex)
  }
  /**
   * Reset all of relevent data to games
   */
  const resetAll = () => {
    setPlayers({ nameX: "", nameO: "" })
    setPlayersScore({ scoreX: 0, scoreO: 0 })
    setGameStatus(["\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0"])
    setStackOrderIndex([])
    console.log("Saved to states")
  }

  // const getAll = () => {
  //   console.log(players)
  //   console.log(playersScore)
  //   console.log(gameStatus)
  //   console.log(stackOrderIndex)
  // }
  /**
   * GET method from NodeJS
   * Get data from the server
   */
  const fetchStats = () => {
    fetch('http://localhost:3000/', { method: 'GET', })
      .then(res => res.json())
      .then(res => {
        setAll(res)
        console.log("Getting res")
        console.log(res)
      })

  }
  /**
   * DELETE method from NodeJS
   * Delete(Empty) data from the server
   */
  const resetStats = () => {
    fetch('http://localhost:3000/', { method: 'DELETE', })
    resetAll();
  }
  /**
   * POST method from NodeJS
   * Save data to the server
   * @param {*To save} newData 
   */
  const saveStats = (newData) => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
    setAll(newData)
  }
  /**
   * apperently dynamically access object property dosnt work here
   * @param {name of the player X} str 
   * @param {name of the player O} str 
   */
  const setPlayersState = async (str1, str2) => {
    const newPlayers = { ...players };
    newPlayers.nameX = str1;
    newPlayers.nameO = str2;
    setPlayers(newPlayers);
  }
  const setPlayersScoreState = async (num1, num2) => {
    const newPlayersScore = { ...playersScore };
    newPlayersScore.scoreX = num1;
    newPlayersScore.scoreO = num2;
    setPlayersScore(newPlayersScore)
  }
  const setGameStatusState = async (charNewArray) => {
    setGameStatus(charNewArray)
  }
  const setStackOrderIndexState = async (stackNewArray) => {
    setStackOrderIndex(stackNewArray)
  }

  /**
   * dynamically access object property
   * @param {a string '' of the name of component to toggle visability} component1
   * @param {a string '' of the name of component to toggle visability} component2
   */
  const toggleVisibility = async (component1, component2) => {
    const newVisible = {
      ...isVisible,
      [component1]: !isVisible[component1],
      [component2]: !isVisible[component2],
    };

    await setIsVisible(newVisible);
  };

  /**
   *  In short this is the html files
   */
  return (
    <>
      {/* if the isVisible valvue is true then show this component */}
      {isVisible.StartMenu && (
        <StartMenu
          toggleVisibility={toggleVisibility} />
      )}
      {isVisible.PlayerNameSelector &&(
      <PlayerNameSelector
          setPlayersState={setPlayersState}
          toggleVisibility={toggleVisibility}
          isTherePlayers={(players.nameX !== "" && players.nameO !== "")}
          resetStats={resetStats} />
      )}
      {isVisible.Game && (
        <Game
          players={players}
          playersScore={playersScore}
          setPlayersScoreState={setPlayersScoreState}
          gameStatus={gameStatus} setGameStatusState={setGameStatusState}
          stackOrderIndex={stackOrderIndex} setStackOrderIndexState={setStackOrderIndexState}
          toggleVisibility={toggleVisibility}
          resetStats={resetStats}
          saveStats={saveStats}
        />
      )}
    </>
  );
}

export default App;
