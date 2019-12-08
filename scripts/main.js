function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    //TODO: use random to generate a number between min and max
    return Math.floor(random * maxValue) + minValue;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName != player1Name) {
        document.getElementById("current").innerText = player1Name;
        currentPlayerName = player1Name;
    }
    else {
        document.getElementById("current").innerText = player2Name;
        currentPlayerName = player2Name;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    //set player 1 and player 2 scores to 0
    var score1 = document.getElementById("score1").value;
    score1 = '0';
    var score2 = document.getElementById("score2").value;
    score2 = '0';
    //verify each player has a name
    //if both players don't have a name display error
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (player1Name == '' || player2Name == '') {
        alert('Please enter a name for each player.');
    }
    else {
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
    }
    changePlayers();
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    var roll = generateRandomValue(1, 6);
    //if the roll is 1
    //  change players
    //  set current total to 0
    if (roll == 1) {
        alert('You rolled a 1. Your turn is over.');
        currTotal = 0;
        document.getElementById('total').value = currTotal.toString();
        changePlayers();
    }
    else {
        //if the roll is greater than 1
        //  add roll value to current total
        currTotal = currTotal + roll;
        document.getElementById('die').value = roll.toString();
    }
    //set the die roll to value player rolled
    //display current total on form
    document.getElementById('total').value = currTotal.toString();
}
function holdDie() {
    //get the current turn total
    document.getElementById('die').value = '';
    // let currTotal = (<HTMLInputElement>document.getElementById('total')).value;
    // parseInt(currTotal);
    var currTotal = parseInt(document.getElementById("total").value);
    var currentPlayerName = document.getElementById('current').innerText;
    var player1Name = document.getElementById('player1').value;
    //determine who the current player is
    //add the current turn total to the player's total score
    if (currentPlayerName == player1Name) {
        // let score1 = (<HTMLInputElement>document.getElementById('score1')).value;
        // currTotal += parseInt(score1);
        // (<HTMLInputElement>document.getElementById('score1')).value = currTotal.toString();
        currTotal += parseInt(document.getElementById("score1").value);
        document.getElementById("score1").value = currTotal.toString();
    }
    else {
        // let score2 = (<HTMLInputElement>document.getElementById('score2')).value;
        // currTotal = currTotal + score2;
        // (<HTMLInputElement>document.getElementById('score2')).value = currTotal.toString();
        currTotal += parseInt(document.getElementById("score2").value);
        document.getElementById("score2").value = currTotal.toString();
    }
    //reset the turn total to 0
    var turnTotal = 0;
    document.getElementById('total').value = turnTotal.toString();
    //change players
    changePlayers();
}
