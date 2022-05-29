let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
let arrayComparison = [];

let interval;
let sec = 59; // valori di partenza  
let min = 2;

let snd_select = new Audio('snd/snd_select.mp3');
let snd_correct = new Audio('snd/snd_correct.mp3');
let snd_startgame = new Audio('snd/snd_startgame.mp3');
let snd_victory = new Audio('snd/snd_victory.mp3');
let snd_gameover = new Audio('snd/snd_gameover.mp3');

const start = document.querySelector('.text-center .start');
const timer = document.querySelector('.text-center .timer');
const grid = document.getElementById('griglia');
const found = document.getElementsByClassName('icon show find disabled');


document.body.onload = gamePreview(); // al caricamento della pagina chiama la funzione e genera il contenuto

function pressStart() { // Gioco e Timer collegati al pulsante Start
    snd_startgame.play();
    timerStop();  // stop all'intervallo precedente
    clearTimer(); // pulizia del div
    gameInit();   // caricamento contenuto del gioco
    printTimer();
    timerStart(); // caricamento nuovo intervallo
}

function pressRestart() {
    snd_victory.pause();
    snd_startgame.play();
    stop();
    timerStop();  // stop all'intervallo precedente
    clearTimer(); // pulizia del div
    gameInit();   // caricamento contenuto del gioco
    timerStart(); // caricamento nuovo intervallo
}

/* -------------------------------------------------------------------------------------------------------------------------- */

function gamePreview() { // Schermata Preview del gioco senza input
    timer.innerHTML = 'Memory Game: 3 minutes to win!';
    
    
    let startButton = document.createElement('input'); // Creazione elemento
    startButton.type = 'button';
    startButton.id = 'button';
    startButton.className = 'button';
    startButton.value = 'Start';                       // Testo da inserire
    startButton.onclick = function() {pressStart();}   // Assegnare funzione ad evento onclick
    start.appendChild(startButton);                    // Scriverlo nel nodo                                
    
    grid.style.pointerEvents = 'none';                 // i div non si possono cliccare
    grid.innerHTML = '';                                 
    for(i=0; i<24; i++) {
        let divCont = document.createElement('div');          
        let divIcon = document.createElement('div');          
        divIcon.className = 'icon';                           
        grid.appendChild(divCont).appendChild(divIcon);                    
    }    
}

function gameInit() {    // Ciclo creazione 2 div cont ed icone, e evento onclick

    // Per selezionare e modificare un button esistente
    let restartButton = document.querySelector('.text-center .start input#button');
    restartButton.value = 'Restart';
    restartButton.className = 'button';
    restartButton.onclick = function() {pressRestart();}

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimali);            // gli passo la funzione shuffle con all'interno le icone                
    grid.innerHTML = '';                                 // pulisco tutto il contenuto al riavvio del browser/button ricomincia
    grid.style.pointerEvents = 'initial';                // sono in grado di cliccare i div

    for(i=0; i<24; i++) {
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
        icons[i].addEventListener('click', displayResult); // visualizza risultato solo con 24 risp esatte
    }                                    
}

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

function printTimer() {
    timer.innerHTML = 'Time: ' + +min + ' min ' + +sec + ' sec';
}

function printGameOver() {
    snd_gameover.play();
    timer.innerHTML = 'Game Over. You lose!';
}

function printResult() {
    snd_correct.pause();
    snd_victory.play();
    timer.innerHTML = 'Congratulations you won! <br>' + 'Time left: ' + +min + ' min ' + +sec + ' sec';
}

function clearTimer() {  // Cancella il testo nel div
    timer.innerHTML = '';
}

/* -------------------------------------------------------------------------------------------------------------------------- */

function shuffle(a) {
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

function displayIcon() {
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

function displayResult() { // Fine partita mostra risultato

    console.log(found);     // inizialmente riporta una HTML Collection vuota
    if (found.length==2) { // se la lunghezza degli elem trovati e' 24
        grid.style.pointerEvents = 'none'; // rende i div non cliccabili
        stop();
        timerStop(); 
        clearTimer();
        printResult(); 
    }
}

//#region ---------------- Traccia --------------------

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

// una funzione che rimuove la classe active e chiama la funzione startGame()
// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, (alla var gli passo tutte le icone, lo ciclo e per ogni elemento creo una card)
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

// una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
// una funzione che nasconde la modale alla fine e riavvia il gioco
// una funzione che calcola il tempo e aggiorna il contenitore sotto

//#endregion