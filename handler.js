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

function postScore(){
      
        var username = document.getElementById("userName").value
        //var lName = document.getElementById("lName").value <--- score
       
    
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
        if (result.status == 404){
        } else {
            renderHighScores(result);     
        }
    })
}


function renderHighScores(result){

    
        const showScores = document.getElementById("scoreList")
        

        for (let i = 0; i < result.length; i++) {
            const selectedScore = result[i]
            
            const scoreListItem = document.createElement("li")
            scoreListItem.classList = "scoreListItem"
            scoreListItem.innerHTML = selectedScore.name + " " + selectedScore.score
            showScores.append(scoreListItem)            
    }
    
}

getHighScores();