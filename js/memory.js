let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
let arrayComparison = [];
const start = document.querySelector('.text-center .start');
const timer = document.querySelector('.text-center .timer');
let interval;
const modalFind = document.querySelector('#modal');

document.body.onload = gamePreview(); // al caricamento della pagina chiama la funzione e genera il contenuto

//#region ---------------- Traccia (1) --------------------

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

//#endregion

//#region ---------------- Traccia (2) --------------------

// una funzione che rimuove la classe active e chiama la funzione startGame()
// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, (alla var gli passo tutte le icone, lo ciclo e per ogni elemento creo una card)
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

//#endregion

function pressStart() { // Gioco e Timer collegati al pulsante Start
    timerStop();  // 1) stop all'intervallo precedente
    clearTimer(); // pulizia del div
    
    gameInit();   // caricamento contenuto del gioco
    timerStart(); // 2) caricamento nuovo intervallo

}

function pressRestart() {
    stop();
    timerStop();  // stop all'intervallo precedente
    clearTimer(); // pulizia del div
    
    gameInit();   // caricamento contenuto del gioco
    timerStart(); // caricamento nuovo intervallo
}

/* -------------------------------------------------------------------------------------------------------------------------- */

function gamePreview() { // Schermata Preview del gioco senza input
    let startButton = document.createElement('input'); // Creazione elemento
    startButton.type = 'button';
    startButton.id = 'button';
    startButton.className = 'button';
    startButton.value = 'Start';                       // Testo da inserire
    startButton.onclick = function() {pressStart();}   // Assegnare funzione ad evento onclick
    start.appendChild(startButton);                    // Scriverlo nel nodo                                
    
    var iconsFind = document.getElementById('griglia');       
    timer.innerHTML = 'Memory Game: 5 minutes to win!'; 
    iconsFind.innerHTML = '';                                 
    for(i=0; i<24; i++) {
        let divCont = document.createElement('div');          
        let divIcon = document.createElement('div');          
        divIcon.className = 'icon';                           
        iconsFind.appendChild(divCont).appendChild(divIcon);                    
    }
}

function gameInit() {    // Ciclo creazione 2 div cont ed icone, e evento onclick

    // Per selezionare e modificare un button esistente
    let restartButton = document.querySelector('.text-center .start input#button');
    restartButton.value = 'Restart';
    restartButton.onclick = function() {pressRestart();}

    var arrayShuffle = shuffle(arrayAnimali);                 // gli passo la funzione shuffle con all'interno le icone                
    var iconsFind = document.getElementById('griglia');       // assegno alla var cards il div html (non il contenuto)
    
    iconsFind.innerHTML = '';                                 // pulisco tutto il contenuto al riavvio del browser/button ricomincia
    for(i=0; i<24; i++) {
        let divCont = document.createElement('div');          // div contenitore
        let divIcon = document.createElement('div');          // div con icona dentro
        divIcon.className = 'icon';                           // assegno classe icon
        
        iconsFind.appendChild(divCont).appendChild(divIcon);  // assegno il div alla destinazione e assegno le icone
        divIcon.innerHTML = arrayShuffle[i];                  // assegno shuffle(icone) nel div delle icone
        
/*         let iconClass = document.querySelector('#griglia>div');
        iconClass.addEventListener('click', function(){

            shuffle(a);
            displayIcon();
            
        }) */
    }
}

let sec = 10; // valori di partenza  
let min = 0;

//poi al click del pulsante start chiama setInterval con funzione:
function timerInit() {   // Timer countdown della partita

    sec--;         // i secondi decrescono al richiamo della funzione
    if(sec <= 0) { // se i secondi sono inferiori/uguali a 0
        min--;     // i minuti scendono di 1
        sec = 59;  // i secondi salgono a 59
    }
/*     if(min <= -1) { 
        timerStop();   // ferma intervallo     
        min = 0;
        sec = 10;
        printResult(); // stampa game over
    }  */

    printTimer();  // stampi il timer
    console.log(timer);
}

function timerStart() {
    interval = setInterval(timerInit, 1000);
}

function timerStop() {
    
    clearInterval(interval);
}

function printTimer() {
    timer.innerHTML = 'Tempo: ' + +min + ' min ' + +sec + ' sec';
}
function printResult() {
    timer.innerHTML = 'Game Over. Hai perso!';
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
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];         // '...' operatore per passare array come argomento:
    this.classList.toggle("show"); // mette/toglie la classe show
    arrayComparison.push(this);    //aggiunge l'oggetto cliccato all'array del confronto
    var len = arrayComparison.length;
    
    if (len === 2) { // se nel confronto ci sono due elementi.
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) { // se uguali aggiunge la classe find
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else { // altrimenti (ha sbagliato)  
            icons.forEach(function(item) {  
                item.classList.add('disabled'); // aggiunge solo la classe disabled
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

//#region ---------------- Traccia (3) --------------------

// una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
// una funzione che nasconde la modale alla fine e riavvia il gioco
// una funzione che calcola il tempo e aggiorna il contenitore sotto

//#endregion