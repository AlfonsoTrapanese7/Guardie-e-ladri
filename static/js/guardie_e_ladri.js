
let guard = document.getElementById("guardia");
let thief = document.getElementById("ladro");
let nMoves = 0; // contatore di mosse

document.getElementById("nord").addEventListener("click", moveNord);
document.getElementById("est").addEventListener("click", moveEst);
document.getElementById("sud").addEventListener("click", moveSud);
document.getElementById("ovest").addEventListener("click", moveOvest);
document.getElementById("ritenta").addEventListener("click", ritenta);
document.getElementById("nextLevel").addEventListener("click", nextLevel);
//Le quattro funzioni che gestiscono i bottoni all' evento click
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

//element = elemento da muovere
// direction nord = 0,  est = 1, sud = 2, ovest = 3 
function move(element, direction) {
    let moved = true;
    
    let positionLeft = parseInt(element.style.left.substring(0, element.style.left.length-2));
    let positionTop = parseInt(element.style.top.substring(0, element.style.top.length-2));

    if (direction == 0) { // Nord
        if (positionTop >= 50) {
            element.style.top = positionTop - 50 + "px";
            rotateCharacter(element, 270);
        } else {
            moved = false;
        }
    } else if (direction == 1) { // Est
        if (positionLeft <= 402) {
            element.style.left = positionLeft + 50 + "px";
            rotateCharacter(element, 0);
        } else {
            moved = false;
        }
    } else if (direction == 2) { // Sud
        if (positionTop <= 402) {
            element.style.top = positionTop + 50 + "px";
            rotateCharacter(element, 90);
        } else {
            moved = false;
        }
    } else { // Ovest
        if (positionLeft >= 50) {
            element.style.left = positionLeft - 50 + "px";
            rotateCharacter(element, 180);
        } else {
            moved = false;
        }
    }

    return moved;
}

function getRandomDirection() { // randomizza le direzioni da 0 a 3

    let randomDirection = Math.floor(Math.random()*4);
    return randomDirection;
}

function moveThief() { // movimento randomico del ladro che evita di muoversi contro il muro
    let hasMoved = false;
    while(hasMoved == false) {

        hasMoved = move(thief, getRandomDirection());

    }
}

function detectCollision() { // controlla se il ladro è stato catturato e in caso positivo disabilita i bottoni e comunica la vittoria della guardia

    let gLeft = parseInt(guard.style.left.substring(0, guard.style.left.length-2));
    let gTop = parseInt(guard.style.top.substring(0, guard.style.top.length-2));

    let tLeft = parseInt(thief.style.left.substring(0, thief.style.left.length-2));
    let tTop = parseInt(thief.style.top.substring(0, thief.style.top.length-2));

    if(gLeft == tLeft && gTop == tTop)
    {
        setButtonDisabled(true);
        
        document.getElementById("pulsanti").style.display = "none";
        document.getElementById("pulsante3").style.display = "block";
        document.getElementById("guardia-sprite").src = "static/imgs/won-pose.png";
        thief.style.display = "none";
        setTimeout(() => alert("HAI VINTO"), 100);
    }
}

function updateMoves() { // conta le mosse effettuate e le mostra a schermo, in caso le mosse siano finite annuncia la sconfitta della guardia e disabilita i bottoni

    nMoves++;

    console.log(nMoves);
    if(nMoves == 20) {

        setButtonDisabled(true);
        
        document.getElementById("pulsanti").style.display = "none";
        document.getElementById("pulsante2").style.display = "block";
        document.getElementById("guardia-sprite").src = "static/imgs/guard-exhausted.png";
        setTimeout(() => alert("HAI PERSO"), 100);
    }

    document.getElementById("esito").innerHTML = "Numero mosse: " + nMoves;
    
}

function setButtonDisabled(disabled) { // disabilita/abilita i bottoni in base al parametro (true = disabilita, false = abilita)

   let buttons = document.getElementsByClassName("pulsante");

   for(i = 0; i < buttons.length; i++) {
        buttons[i].disabled = disabled;
   }

}

function ritenta(){ // ricarica la pagina
    location.reload();
}

function nextLevel(){
    location.reload();
}

let stanza = document.getElementById("stanza"); 
let x = stanza.clientWidth;
let y = stanza.clientHeight;

document.addEventListener("keydown", moveWASD);

function moveWASD(evento) {
    let tasto = evento.keyCode;
    let est = guard.style.left;
    let nord = guard.style.top;

    if (tasto == 68 || tasto == 39) { // D → Destra
        est = Number(est.substring(0, est.length - 2)) + 50;
        if (est < x - guard.clientWidth) {
            guard.style.left = est + "px";
            rotateCharacter(guard, 0);
        }
    } else if (tasto == 65 || tasto == 37) { // A → Sinistra
        est = Number(est.substring(0, est.length - 2)) - 50;
        if (est >= 0) {
            guard.style.left = est + "px";
            rotateCharacter(guard, 180);
        }
    } else if (tasto == 87 || tasto == 38) { // W → Su
        nord = Number(nord.substring(0, nord.length - 2)) - 50;
        if (nord >= 0) {
            guard.style.top = nord + "px";
            rotateCharacter(guard, 270);
        }
    } else if (tasto == 83 || tasto == 40) { // S → Giù
        nord = Number(nord.substring(0, nord.length - 2)) + 50;
        if (nord < y - guard.clientHeight) {
            guard.style.top = nord + "px";
            rotateCharacter(guard, 90);
        }
    }

    moveThief();
    detectCollision();
    updateMoves();
}

function rotateCharacter(character, angle) {
    character.style.transform = `rotate(${angle}deg)`;
}