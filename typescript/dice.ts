function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    //TODO: use random to generate a number between min and max
    return Math.floor(random * maxValue) + minValue;
}


function changePlayers():void{
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName != player1Name) {
        document.getElementById("current").innerText = player1Name;
        currentPlayerName = player1Name;
    } else {
        document.getElementById("current").innerText = player2Name;
        currentPlayerName = player2Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    let score1 = (<HTMLInputElement>document.getElementById("score1")).value
    score1 = '0';
    let score2 = (<HTMLInputElement>document.getElementById("score2")).value
    score2 = '0';
    //verify each player has a name
    //if both players don't have a name display error
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    if(player1Name == '' || player2Name == '') {
        alert('Please enter a name for each player.')
    } else {
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
    }
    changePlayers();
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let roll = generateRandomValue(1, 6);
    //if the roll is 1
    //  change players
    //  set current total to 0
    if(roll == 1) {
        alert('You rolled a 1. Your turn is over.');
        currTotal = 0;
        (<HTMLInputElement>document.getElementById('total')).value = currTotal.toString();

        changePlayers();        
    } else {
        //if the roll is greater than 1
        //  add roll value to current total
        currTotal = currTotal + roll;
        (<HTMLInputElement>document.getElementById('die')).value = roll.toString();
    }
    
    //set the die roll to value player rolled
    //display current total on form
    (<HTMLInputElement>document.getElementById('total')).value = currTotal.toString();
}

function holdDie():void{
    //get the current turn total
    (<HTMLInputElement>document.getElementById('die')).value = '';
    // let currTotal = (<HTMLInputElement>document.getElementById('total')).value;
    // parseInt(currTotal);
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    let currentPlayerName = document.getElementById('current').innerText;
    let player1Name = (<HTMLInputElement>document.getElementById('player1')).value;
    //determine who the current player is
    //add the current turn total to the player's total score
    if(currentPlayerName == player1Name) {
        // let score1 = (<HTMLInputElement>document.getElementById('score1')).value;
        // currTotal += parseInt(score1);
        // (<HTMLInputElement>document.getElementById('score1')).value = currTotal.toString();
        currTotal += parseInt((<HTMLInputElement>document.getElementById("score1")).value); 
        (<HTMLInputElement>document.getElementById("score1")).value = currTotal.toString(); 
    } else {
        // let score2 = (<HTMLInputElement>document.getElementById('score2')).value;
        // currTotal = currTotal + score2;
        // (<HTMLInputElement>document.getElementById('score2')).value = currTotal.toString();
        currTotal += parseInt((<HTMLInputElement>document.getElementById("score2")).value); 
        (<HTMLInputElement>document.getElementById("score2")).value = currTotal.toString();         
    }

    //reset the turn total to 0
    let turnTotal = 0;
    (<HTMLInputElement>document.getElementById('total')).value = turnTotal.toString();
    //change players
    changePlayers();
}