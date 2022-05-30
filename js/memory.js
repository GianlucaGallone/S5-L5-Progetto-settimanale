let arrayAnimaliEasy = ['🐵', '🐶', '🐴', '🐺', '🐷', '🐮', '🐵', '🐶', '🐴', '🐺', '🐷', '🐮'];
let arrayAnimaliNormal = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
let arrayAnimaliHard = ['🦖', '🐳', '🐢', '🐙', '🐞', '🐻', '🦈', '🦂', '🐲', '🦅', '🦃', '🦒', '🐌', '🐜', '🐟', '🐧', '🦕', '🐊', '🦖', '🐳', '🐢', '🐙', '🐞', '🐻', '🦈', '🦂', '🐲', '🦅', '🦃', '🦒', '🐌', '🐜', '🐟', '🐧', '🐊', '🦕'];
let arrayComparison = [];

let interval;
let sec = 59; // valori di partenza  
let min = 2;

let snd_select = new Audio('snd/snd_select.mp3');
let snd_correct = new Audio('snd/snd_correct.mp3');
let snd_startgame = new Audio('snd/snd_startgame.mp3');
let snd_victory = new Audio('snd/snd_victory.mp3');
let snd_gameover = new Audio('snd/snd_gameover.mp3');

let mobile = window.matchMedia('(max-width: 420px)');
let tablet = window.matchMedia('(max-width: 600px)');
let desktop = window.matchMedia('(min-width: 601px)');

const start = document.querySelector('.text-center .start');
const timer = document.querySelector('.text-center .timer');
const grid = document.getElementById('griglia');
const found = document.getElementsByClassName('icon show find disabled');

document.body.onload = gamePreview(); // al caricamento della pagina chiama la funzione e genera il contenuto

//#region ---------- Buttons onclick functions ----------------

function startEasy() {   // Easy Difficulty Button
    snd_startgame.play();
    timerStop(); 
    clearTimer();
    gameInitEasy();  
    printTimer();
    timerStart();
}

function restartEasy() {
    snd_victory.pause();
    snd_startgame.play();
    stop();
    timerStop();  
    clearTimer(); 
    gameInitEasy();
    timerStart(); 
}

function startNormal() { // Normal Difficulty Button
    snd_startgame.play();
    timerStop();      // stop all'intervallo precedente
    clearTimer();     // pulizia del div
    gameInitNormal(); // caricamento contenuto del gioco
    printTimer();     // stampa il timer
    timerStart();     // caricamento nuovo intervallo
}

function restartNormal() {
    snd_victory.pause();
    snd_startgame.play();
    stop();
    timerStop();      // stop all'intervallo precedente
    clearTimer();     // pulizia del div
    gameInitNormal(); // caricamento contenuto del gioco
    timerStart();     // caricamento nuovo intervallo
}

function startHard() {  // Hard Difficulty Button
    snd_startgame.play();
    timerStop();     
    clearTimer();     
    gameInitHard(); 
    printTimer();
    timerStart();    
}

function restartHard() {
    snd_victory.pause();
    snd_startgame.play();
    stop();
    timerStop();     
    clearTimer();   
    gameInitHard();
    timerStart();   
}

//#endregion

//#region ------ Game Initialization & Buttons Creation ----------

function gamePreview() { // Schermata Preview del gioco senza input
    
    timer.innerHTML = 'Memory Game: 3 minutes to win!';
    
    /* ---- Creazione button easy ----- */

    let btnEasy = document.createElement('input');
    btnEasy.type = 'button';
    btnEasy.id = 'btnEasy';
    btnEasy.value = 'Easy';                       
    btnEasy.onclick = function() {startEasy();}   
    start.appendChild(btnEasy);                    

    /* ---- Creazione button normal ----- */

    let btnNormal = document.createElement('input'); // Creazione elemento
    btnNormal.type = 'button';
    btnNormal.id = 'btnNormal';
    btnNormal.value = 'Normal';                      // Testo da inserire
    btnNormal.onclick = function() {startNormal();}  // Assegnare funzione ad evento onclick
    start.appendChild(btnNormal);                    // Scriverlo nel nodo   
    
    /* ---- Creazione button hard ----- */

    let btnHard = document.createElement('input');
    btnHard.type = 'button';
    btnHard.id = 'btnHard';
    btnHard.value = 'Hard';                       
    btnHard.onclick = function() {startHard();}   
    start.appendChild(btnHard);  
    
    grid.style.pointerEvents = 'none';                 // i div non si possono cliccare
    grid.innerHTML = '';                               // pulisce eventuale contenuto  
    for(i=0; i<24; i++) {                              // div placeholders
        let divCont = document.createElement('div');          
        let divIcon = document.createElement('div');          
        divIcon.className = 'icon';                           
        grid.appendChild(divCont).appendChild(divIcon);                    
    }    
}

function gameInitEasy() {

    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    // Per selezionare e modificare un button esistente
    restartBtnEasy.value = 'Restart';

    // Media Queries tramite JS per spostare buttons dopo averli messi hidden

    function mediaQ() {
        if (desktop.matches) {                         // se la media matcha
            restartBtnEasy.style.marginLeft = '275px'; // sposto il button al centro
            restartBtnEasy.style.marginRight = '0';
        } 
        if (tablet.matches) {
            restartBtnEasy.style.marginLeft = '0';
            restartBtnEasy.style.marginRight = '-175px';
        } 
        if (mobile.matches) {
            restartBtnEasy.style.marginRight = '-165px';
        }
    }    

    mediaQ(desktop, tablet, mobile); // chiama la funzione all'avvio
    desktop.addListener(mediaQ);     // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    mobile.addListener(mediaQ);
               
    restartBtnNormal.style.visibility = 'hidden'; 
    restartBtnHard.style.visibility = 'hidden';   
    restartBtnEasy.onclick = function() {restartEasy();}

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimaliEasy);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial';                

    for(i=0; i<12; i++) { // creazione 12 div
        let divCont = document.createElement('div');    
        let divIcon = document.createElement('div');     
        divIcon.className = 'icon';                      
        grid.appendChild(divCont).appendChild(divIcon);  
        divIcon.innerHTML = arrayShuffle[i];             
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                       
        icons[i].addEventListener('click', displayIcon);   
        icons[i].addEventListener('click', easyResult); 
    }                                    
}

function gameInitNormal() {

    // Per selezionare e modificare un button esistente
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnNormal.value = 'Restart';                  // Modifico il button normal
    restartBtnEasy.style.visibility = 'hidden';          // Nascondo il button easy
    restartBtnHard.style.visibility = 'hidden';          // Nascondo il button hard
    restartBtnNormal.onclick = function() {restartNormal();}

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimaliNormal);      // gli passo la funzione shuffle con all'interno le icone                
    grid.innerHTML = '';                                 // pulisco tutto il contenuto
    grid.style.pointerEvents = 'initial';                // sono in grado di cliccare i div

    for(i=0; i<24; i++) {                                // creazione 24 div
        let divCont = document.createElement('div');     // div contenitore
        let divIcon = document.createElement('div');     // div con icona dentro
        divIcon.className = 'icon';                      // assegno classe icon
        grid.appendChild(divCont).appendChild(divIcon);  // assegno il div alla destinazione e assegno le icone
        divIcon.innerHTML = arrayShuffle[i];             // assegno shuffle(icone) nel div delle icone
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                       // itera array passato nella var icons
        icons[i].addEventListener('click', displayIcon);   // e cicla due funzioni contemporaneamente
        icons[i].addEventListener('click', normalResult); // visualizza risultato solo con 24 risp esatte
    }                                    
}

function gameInitHard() {

    // Per selezionare e modificare un button esistente
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnHard.value = 'Restart';

    // Media Queries tramite JS per spostare buttons dopo averli messi hidden

    function mediaQ() { 
        if (desktop.matches) {                          // se la media matcha
            restartBtnHard.style.marginLeft = '-500px'; // sposto il button al centro
        } else if (tablet.matches) {
            restartBtnHard.style.marginLeft = '-150px';
            restartBtnHard.style.padding = '10px 30px';
        } else if (mobile.matches) {
            restartBtnHard.style.marginLeft = '0';
        }
    }    

    mediaQ(desktop, tablet, mobile); // chiama la funzione all'avvio
    desktop.addListener(mediaQ);     // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    mobile.addListener(mediaQ);

    restartBtnEasy.style.visibility = 'hidden';
    restartBtnNormal.style.visibility = 'hidden';
    restartBtnHard.onclick = function() {restartHard();}

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimaliHard);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial';                

    for(i=0; i<36; i++) { // creazione 36 div
        let divCont = document.createElement('div');    
        let divIcon = document.createElement('div');     
        divIcon.className = 'icon';                      
        grid.appendChild(divCont).appendChild(divIcon);  
        divIcon.innerHTML = arrayShuffle[i];             
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                       
        icons[i].addEventListener('click', displayIcon);   
        icons[i].addEventListener('click', hardResult); 
    }                                    
}

//#endregion

//#region ---------- Timer & Print Functions --------------

function timerInit() {   // Timer countdown della partita

    sec--;         // i secondi decrescono al richiamo della funzione
    if(sec <= 0) { // secondi sono inferiori/uguali a 0
        min--;     // scendono i minuti
        sec = 59;  // si ricaricano i sec
    }

    printTimer();

    if(min <= -1) {      // -1 = game over
        timerStop();     // ferma intervallo
        printGameOver(); // stampa game over     
        min = 2;
        sec = 59;        // ripristina valori iniziali
    } 
}

function timerStart() {
    min = 2; 
    sec = 59; // ripristina valori iniziali
    interval = setInterval(timerInit, 1000);
}

function timerStop() {
    clearInterval(interval);
}

function clearTimer() {  // Cancella il testo nel div
    timer.innerHTML = '';
}

function printTimer() {
    timer.innerHTML = 'Time: ' + +min + ' min ' + +sec + ' sec';
}

function printGameOver() {
    grid.style.pointerEvents = 'none';
    snd_gameover.play();
    timer.innerHTML = 'Game Over. You lose!';
}

function printResult() {
    snd_correct.pause();
    snd_victory.play();
    timer.innerHTML = 'Congratulations you won! <br>' + 'Time left: ' + +min + ' min ' + +sec + ' sec';
}

//#endregion

//#region ---- Shuffle, Mostra icone & Risultati Partita ----

function shuffle(a) {     // Mischia le icone nell'array
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

function displayIcon() {  // Comparazione icone e mostra carte
    var iconsFind = document.getElementsByClassName('find');
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];         // '...' operatore per passare array come argomento:
    this.classList.toggle("show"); // mette/toglie la classe show
    arrayComparison.push(this);    //aggiunge l'oggetto cliccato all'array del confronto
    var len = arrayComparison.length;
    snd_select.play();
    
    if (len === 2) { // se nel confronto ci sono due elementi.  // qui sotto ho aggiunto una comparazione con se stesso, altrimenti cliccando 2 volte la stessa si bloccava
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML && arrayComparison[0] !== arrayComparison[1]) { // se uguali aggiunge la classe find
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
            snd_select.pause();
            snd_correct.play();

        } else { // altrimenti (ha sbagliato)  
            icons.forEach(function(item) {  
                item.classList.add('disabled'); // aggiunge solo la classe disabled
                snd_select.play();
            });
            
            setTimeout(function() {             // timeout rimuove la classe show per nasconderli
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

function easyResult() {   // Mostra risultato Easy

    if (found.length==12) {
        grid.style.pointerEvents = 'none';
        stop();
        timerStop(); 
        clearTimer();
        printResult(); 
    }
}

function normalResult() { // Mostra risultato Normal

    if (found.length==24) {                // se hai trovato tutte le carte
        grid.style.pointerEvents = 'none'; // rende i div non cliccabili
        stop();
        timerStop(); 
        clearTimer();
        printResult(); 
    }
}

function hardResult() {   // Mostra risultato Hard

    if (found.length==36) {               
        grid.style.pointerEvents = 'none';
        stop();
        timerStop(); 
        clearTimer();
        printResult(); 
    }
}

//#endregion