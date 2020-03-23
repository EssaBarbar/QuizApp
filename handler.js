const TheGameBegin = document.getElementById("startTheGame")
TheGameBegin && TheGameBegin.addEventListener("click", newGame)
const guess = document.getElementById("guess")
guess && guess.addEventListener("click", checkGuessing)
const showrules = document.getElementById("SaveInDatabse")
const namefield = document.getElementById("userName")
const higherOrLower = document.getElementById("popo")





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

function postScore(score) {

    var uName = document.getElementById("userName").value
    var testScore = score;

    let data = new FormData()
    data.append("Name", uName)
    data.append("Score", testScore)
    data.append("endpoint", "postScore")


    makeRequest('./databasereciever.php', 'POST', data, (result) => {
        console.log(result)
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
        scoreListItem.style.color = "white"
        showScores.append(scoreListItem)
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
    TheGameBegin.style.display = "none"
    namefield.style.display = "none"

}

function checkGuessing() {
    let theGuessedNumber = document.getElementById("guessedNumber").value
    if (theGuessedNumber) {
        if (theGuessedNumber == theRandomNumber) {
            higherOrLower.innerText = "Du Vann!" + " " + points + " " + "poäng"
            console.log("WIIIIIN", points)
            postScore(points)
            TheGameBegin.innerText = "Spela igen"
            TheGameBegin.style.display = "flex"
        } else {
            if (theGuessedNumber > theRandomNumber) {
                higherOrLower.innerText = "Lägre"
            } else {
                higherOrLower.innerText = "Högre"
            }
            numberOfFails++
            points = points - (numberOfFails * 6)

            if (points <= 0) {
                higherOrLower.innerText = "För många gissningar, spelet är över"
                TheGameBegin.innerText = "Spela igen"
                TheGameBegin.style.display = "flex"
                return
            }
            let botguessing = getRndInteger(min, max)
            if (botguessing == theRandomNumber) {
                higherOrLower.innerText = "Boten vinner"
                TheGameBegin.innerText = "Spela igen"
                TheGameBegin.style.display = "flex"
                return
            } else {
                if (botguessing > theRandomNumber) {
                    max = botguessing
                } else {
                    min = botguessing + 1
                }
                console.log(botguessing)
            }
        }
    } else {
        alert("Var vänlig fyll i ett nummer")
    }


    function getRndInteger(min, max) {
        return Math.floor(randomG(70) * (max - min)) + min;
    }

}
function randomG(v) {
    var r = 0;
    for (var i = v; i > 0; i--) {
        r += Math.random();
    }
    return r / v;
}

let showHide = false
function SaveInDatabse() {
    if (showHide == false) {
        document.getElementById("rules").style.display = 'block';
        showHide = true
    } else {
        document.getElementById("rules").style.display = 'none';
        showHide = false

    }
}
function startTheGame(id) {
    document.getElementById("startTheGame").style.display = 'none';
    document.getElementById("guessedNumber").value = ""
    document.getElementById("popo").innerHTML = ""
}