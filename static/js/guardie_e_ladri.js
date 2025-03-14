
let guard = document.getElementById("guardia");
let thief = document.getElementById("ladro");
let nMoves = 0;

document.getElementById("nord").addEventListener("click", moveNord);
document.getElementById("est").addEventListener("click", moveEst);
document.getElementById("sud").addEventListener("click", moveSud);
document.getElementById("ovest").addEventListener("click", moveOvest);
document.getElementById("ritenta").addEventListener("click", ritenta);
document.getElementById("nextLevel").addEventListener("click", nextLevel);

function moveNord() {
    
    move(guard, 0);
    moveThief();
    detectCollision();
    updateMoves();
}

function moveEst() {
    
    move(guard, 1);
    moveThief();
    detectCollision();
    updateMoves();
}

function moveSud() {

    move(guard, 2);
    moveThief();
    detectCollision();
    updateMoves();
}

function moveOvest() {

    move(guard, 3);
    moveThief();
    detectCollision();
    updateMoves();
}

function updateGameState() {

}

//element = elemento da muovere
// direction nord = 0,  est = 1, sud = 2, ovest = 3 
function move(element, direction){

    let moved = true;
    
    let positionLeft = parseInt(element.style.left.substring(0, element.style.left.length-2));
    let positionTop = parseInt(element.style.top.substring(0, element.style.top.length-2));

    if(direction == 0){

        if(positionTop >= 50) {
            element.style.top = positionTop - 50 + "px";
        }
        else{
            moved = false;
        } 

    } else if(direction ==1){

        if(positionLeft <= 402) {
            element.style.left = positionLeft + 50 + "px";
        }
        else{
            moved = false;
        } 

    }else if(direction == 2){

        if(positionTop <= 402) {
            element.style.top = positionTop + 50 + "px";
        }
        else{
            moved = false;
        } 

    } else {

        if(positionLeft >= 50) {
            let step = -50;
            element.style.left = positionLeft - 50 + "px";
        }
        else{
            moved = false;
        } 
    }

    return moved;
}

function getRandomDirection() {

    let randomDirection = Math.floor(Math.random()*4);
    return randomDirection;
}

function moveThief() {
    let hasMoved = false;
    while(hasMoved == false) {

        hasMoved = move(thief, getRandomDirection());

    }
}

function detectCollision() {

    let gLeft = parseInt(guard.style.left.substring(0, guard.style.left.length-2));
    let gTop = parseInt(guard.style.top.substring(0, guard.style.top.length-2));

    let tLeft = parseInt(thief.style.left.substring(0, thief.style.left.length-2));
    let tTop = parseInt(thief.style.top.substring(0, thief.style.top.length-2));

    if(gLeft == tLeft && gTop == tTop)
    {
        setButtonDisabled(true);
        
        setTimeout(() => alert("HAI VINTO"), 10);
        document.getElementById("pulsanti").style.display = "none";
        document.getElementById("pulsante3").style.display = "block";
        
    }

}

function updateMoves() {

    nMoves++;

    console.log(nMoves);
    if(nMoves == 20) {

        setButtonDisabled(true);
        
        setTimeout(() => alert("HAI PERSO"), 10);
        document.getElementById("pulsanti").style.display = "none";
        document.getElementById("pulsante2").style.display = "block";
    }

    document.getElementById("esito").innerHTML = "Numero mosse: " + nMoves;
    
}

function setButtonDisabled(disabled) {

   let buttons = document.getElementsByClassName("pulsante");

   for(i = 0; i < buttons.length; i++) {
        buttons[i].disabled = disabled;
   }

}

function ritenta(){
    location.reload();
}

function nextLevel(){
    location.reload();
}