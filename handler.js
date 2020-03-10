const TheGameBegin = document.getElementById("startTheGame")
TheGameBegin && TheGameBegin.addEventListener("click", newGame)
const guess = document.getElementById("guess")
guess && guess.addEventListener("click", checkGuessing)





function makeRequest(url, method, data, callback) {
    fetch(url, {
        method: method,
        body: data
    }).then((data) => {
        return data.json()
    }).then((result) => {
        callback(result);
    }).catch((err) => {
        console.log("Error: ", err)
    })
}
// document.getElementById("submitBtn").addEventListener("click", postScore()); för eve

function postScore(score) {

    var username = document.getElementById("userName").value


    let data = new FormData()
    data.append("Name", username)
    data.append("Score", score)
    data.append("endpoint", "postScore")


    makeRequest('./databasereciever.php', 'POST', data, (result) => {
    })

}

function getHighScores() {

    makeRequest('./databasereciever.php?endpoint=getScore', 'GET', null, (result) => {
        console.log(result)
        if (result.status == 404) {
        } else {
            renderHighScores(result);
        }
    })
}


function renderHighScores(result) {


    const showScores = document.getElementById("scoreList")


    for (let i = 0; i < result.length; i++) {
        const selectedScore = result[i]

        const scoreListItem = document.createElement("li")
        scoreListItem.classList = "scoreListItem"
        scoreListItem.innerHTML = selectedScore.name + " " + selectedScore.score
        // showScores.append(scoreListItem)
    }

}
getHighScores();

let theRandomNumber = Math.floor(Math.random() * 20 + 1)
let numberOfFails = 0
let points = 100
let min = 0
let max = 20

function newGame() {
    theRandomNumber = Math.floor(Math.random() * 20 + 1)
    numberOfFails = 0
    points = 100
    min = 0
    max = 20
    console.log("theRandomNumber", theRandomNumber)

}

function checkGuessing() {
    let theGuessedNumber = document.getElementById("guessedNumber").value
    if (theGuessedNumber == theRandomNumber) {
        console.log("WIIIIIN", points)
        // postScore(points)

    } else {
        if (theGuessedNumber > theRandomNumber) {
            console.log("wrong number gissa lägre nästa gång")
        } else {
            console.log("wrong number gissa högre nästa gång")
        }
        numberOfFails++
        points = points - (numberOfFails * 6)

        if (points <= 0) {
            console.log("So many tries Gmae over")
            return
        }
        let botguessing = getRndInteger(min, max)
        if (botguessing == theRandomNumber) {
            console.log("botenvinner")
            return
        } else {
            if (botguessing > theRandomNumber) {
                max = botguessing
            } else {
                min = botguessing + 1
            }
            console.log("boten gissade fel, din tur igen", botguessing)
        }


        // visa spela om knappen
    }


    function getRndInteger(min, max) {
        return Math.floor(randomG(80) * (max - min)) + min;
    }

}
function randomG(v) {
    var r = 0;
    for (var i = v; i > 0; i--) {
        r += Math.random();
    }
    return r / v;
}