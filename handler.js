const TheGameBegin = document.getElementById("startTheGame")
TheGameBegin && TheGameBegin.addEventListener("click", newGame)
const guess = document.getElementById("guess")
guess && guess.addEventListener("click", checkGuessing)
const showrules = document.getElementById("SaveInDatabse")
const higherOrLower = document.getElementById("popo")
const newPlayer = document.getElementById("newPlayer")
newPlayer && newPlayer.addEventListener("click", newPlayerFunc)
const namefield = document.getElementById("userName")
namefield && namefield.addEventListener("change", updateStorage)
window.onload = init
const nametext = document.getElementById("nameTxt");


function newPlayerFunc() {
    sessionStorage.setItem("userFound", "empty")
    location.reload()
}
function updateStorage() {
    sessionStorage.setItem("userFound", namefield.value)
}
function init() {
    if (sessionStorage.getItem("userFound") == null) {
    } else if (sessionStorage.getItem("userFound") == "empty") {
        TheGameBegin.style.display = "block"
        namefield.style.display = "block"
        nametext.style.display = "block"
    }
    else {
        TheGameBegin.style.display = "none"
        namefield.style.display = "none"
        nametext.style.display = "none"
    }
}



function makeRequest(url, method, data, callback) {
    fetch(url, {
        method: method,
        body: data
    }).then((data) => {
        return data.json()
    }).then((result) => {
        callback(result);
    }).catch((err) => {
        // console.log("Error: ", err)
    })
}

function postScore(score) {

    var uName = sessionStorage.getItem("userFound")
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
let countdown
getHighScores();

let theRandomNumber = Math.floor(Math.random() * 20 + 1)
let numberOfFails = 0
let points = 100
let min = 0
let max = 20

function newGame() {
    if (checkStorage() == "empty") {
        alert("Please enter your name to be able to play")
    } else {
        theRandomNumber = Math.floor(Math.random() * 20 + 1)
        numberOfFails = 0
        points = 100
        min = 0
        max = 20
        console.log("theRandomNumber", theRandomNumber)
        TheGameBegin.style.display = "none"
        namefield.style.display = "none"
        nametext.style.display = "none"
        setResetInterval(true)

    }
}
function setResetInterval(bool) {
    if (bool) {
        let seconds = 8;
        countdown = setInterval(function () {
            seconds--;
            document.getElementById("countdown").textContent = seconds;
            if (seconds <= 0) {
                alert("Time is out")
                clearInterval(countdown);
            }
        }, 1000);
    } else {
        clearInterval(countdown);
    }
}

function checkGuessing() {
    setResetInterval(false)
    setResetInterval(true)
    higherOrLower.innerText = ""
    guess.innerText = "Vänta.."
    setTimeout(checkGuessingAfterTimeout, 500)

    function checkGuessingAfterTimeout() {
        guess.innerText = "Gissa!!"
        let theGuessedNumber = document.getElementById("guessedNumber").value
        if (theGuessedNumber) {
            if (theGuessedNumber == theRandomNumber) {
                higherOrLower.innerText = "Du Vann!" + " " + points + " " + "poäng"
                console.log("WIIIIIN", points)
                setResetInterval(false)
                postScore(points)
                TheGameBegin.innerText = "Spela igen"
                TheGameBegin.style.justifyContent = "center"
                TheGameBegin.style.display = "flex"
            } else {
                higherOrLower.innerText = "", 1000
                if (theGuessedNumber > theRandomNumber) {
                    higherOrLower.innerText = "Lägre"
                } else {
                    higherOrLower.innerText = "Högre", 1000
                }
                numberOfFails++
                points = points - (numberOfFails * 6)

                if (points <= 0) {
                    setResetInterval(false)
                    higherOrLower.innerText = "För många gissningar, spelet är över"
                    TheGameBegin.innerText = "Spela igen"
                    TheGameBegin.style.justifyContent = "center"
                    TheGameBegin.style.display = "flex"
                    return
                }
                let botguessing = getRndInteger(min, max)
                if (botguessing == theRandomNumber) {
                    setResetInterval(false)
                    higherOrLower.innerText = "Boten vinner"
                    TheGameBegin.innerText = "Spela igen"
                    TheGameBegin.style.justifyContent = "center"
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
function startTheGame() {
    document.getElementById("startTheGame").style.display = 'none';
    document.getElementById("guessedNumber").value = ""
    document.getElementById("popo").innerHTML = ""
}
function checkStorage() {
    if (sessionStorage.getItem("userFound") == "empty") {
        return "empty"
    } else {
        return sessionStorage.getItem("userFound")
    }
}
