
const empty = '\u00A0'

const setSubjectReact = (setSubject, text) => {
    setSubject(text);
};
const setPlayersScoreShowReact = (playersScoreShow, setPlayersScoreShow,
    char) => {
    var newPlayersScoreShow = { ...playersScoreShow }
    if (char === 'X')
        newPlayersScoreShow.scoreX++
    else
        newPlayersScoreShow.scoreO++

    setPlayersScoreShow(newPlayersScoreShow)

};
/**
 * Count how many plays are on the game.
 * @param {*gameStatus} gameStatus 
 * @returns who have more plays
 */
function countPlays(gameStatus) {
    var xcount = 0;
    var ocount = 0;
    for (let i = 0; i < gameStatus.length; i++) {
        if (gameStatus[i] === 'X')
            xcount++;
        else if (gameStatus[i] === 'O')
            ocount++;
    }
    if (xcount > ocount)
        return 'O';
    else
        return 'X'
}
/**
 * Check if array is empty in three indexes.
 */
function containWinnerChar(gameStatus,i,i3,i6){
    return gameStatus[i]!==empty &&
            gameStatus[i3]!==empty &&
            gameStatus[i6]!==empty;
}
/**
 * The main method to play tic tac toe
 * Count how many plays are on the boerd and then decide who plays.
 * Check if the button press is valid.
 * Check for win and draw condition
 * @param {* position of the play} id 
 * @param {* Array of the position and value} gameStatusOriginal 
 * @param {* player names from App.js} players 
 * @param {* To change the H1 of Component Game} setSubject 
 * @param {* increment the score with} playersScoreShow 
 * @param {* To set new scores} setPlayersScoreShow 
 * @param {* To set the pointer to not be clickble} setPointerEventsValue 
 * @returns the updated gameStatus
 */
export function nextMove(id, gameStatusOriginal,
    players,
    setSubject,
    playersScoreShow, setPlayersScoreShow,
    setPointerEventsValue
    ) 
    {
    var gameStatus = [...gameStatusOriginal]
    // X always move first and moves when less/equals to O
    var char = countPlays(gameStatus)

    if (gameStatus[id] !== empty) {
        errorMove();
        return gameStatus;
    }
    //write the char to the array
    gameStatus[id] = char;

    //Check for win condition
    var finalFlag = false;
    var winner = isWin(gameStatus, finalFlag);
    if (winner !== empty) {
        finalFlag = true;
        alert(winner + " is the Winner");
        setSubjectReact(setSubject, (char + " Won "))

        score(
        isWin(gameStatus, finalFlag),
        playersScoreShow,setPlayersScoreShow,
        setPointerEventsValue
        )
        
        return gameStatus// return it here to not call the draw
    }

    //isdraw
    if (isFull(gameStatus)) {
        setPointerEventsValue('none')
        alert("BOTH "+players.nameX+" && "+players.nameO+" LOSSES");
    }
    console.log("Returning")
    console.log(gameStatus)
    return gameStatus;
}

//checks if the array is full
export function isFull(gameStatus) {
    for (let i = 0; i < gameStatus.length; i++) {
        if (gameStatus[i] === empty)
            return false
    }
    return true
}

export function score(winnerChar,
    playersScoreShow, setPlayersScoreShow,
    setPointerEventsValue) {

    setPlayersScoreShowReact(playersScoreShow, setPlayersScoreShow, winnerChar)
    //Make the elements not clickble
    setPointerEventsValue('none')
}
/**
 * check for a win condition and returns if there is.
 * this function will run again for marking the winners and returns the winner value
 * @param {*} gameStatus 
 * @param {* if we will print the winners} final 
 * @returns 
 */
export function isWin(gameStatus, final) {
    var i = 0;

    //row check if win
    while (i < 3) {
        var i3=i+3
        var i6=i+6
        if (gameStatus[i] === gameStatus[i3] && gameStatus[i] === gameStatus[i6] &&
            (containWinnerChar(gameStatus,i,i3,i6))) {
            if (final)
                markWin(i, i + 3, i + 6)
            return gameStatus[i];
        }
        i++;
    }
    i = 0

    //collum check if win
    while (i !== 9) {
        if (gameStatus[i] === gameStatus[i + 1] && gameStatus[i] === gameStatus[i + 2]) {
            if (final)
                markWin(i, i + 1, i + 2)
            return gameStatus[i];
        }
        i += 3;
    }

    //diagonal check if win
    if (gameStatus[0] === gameStatus[4] && gameStatus[0] === gameStatus[8]) {
        if (final)
            markWin(0, 4, 8)
        return gameStatus[0];

    }
    if (gameStatus[2] === gameStatus[4] && gameStatus[2] === gameStatus[6]) {
        if (final)
            markWin(2, 4, 6)
        return gameStatus[2];
    }

    return empty;

}

/**
 * marking the winner in a lazy way
 */
export function markWin(first, second, third) {
    document.getElementById(first).style.color = "springgreen"
    document.getElementById(second).style.color = "springgreen"
    document.getElementById(third).style.color = "springgreen"
}

export function errorMove() {
    alert("Error this move is invalid");
}
export function confirmation(text){
    return window.confirm(text)
}
