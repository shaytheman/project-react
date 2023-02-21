const express = require('express')
const fs = require('fs');
const cors =require('cors');
// const body = require('body-parser');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

const fileDir="./Data/gameStatus.json";
const emptyJson = JSON.stringify({
    players:{nameX: "", nameO: ""},
    playersScore:{scoreX: 0, scoreO: 0},
    gameStatus:["\u00A0", "\u00A0", "\u00A0", "X", "\u00A0", "\u00A0", "\u00A0", "\u00A0", "\u00A0"],
    stackOrderIndex:[]
})
function getJson() {

    var string = fs.readFileSync(fileDir, "utf8", (err, dataJ) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
    });
    var data = JSON.parse(string)
    return data;
}

app.post("/", (req, res) =>{
    console.log("Saving:")
    console.log(req.body)
    fs.writeFileSync(fileDir, JSON.stringify(req.body));
    return res.status(201).json({message:'success'})
})


/**
 * Get the data files.
 * To apply to the game
 */
app.get("/", (req, res) =>{
    var Data=getJson("./Data/gameStatus.json")
    // console.log("sending "+Data)
    res.json(Data)
})
/**
 * 
 */
app.delete("/", (req, res) =>{
    fs.writeFileSync(fileDir, emptyJson);
    return res.status(201).json({message:'success'})
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });