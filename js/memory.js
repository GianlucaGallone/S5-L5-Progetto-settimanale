let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/

let arrayComparison = [];
document.body.onload = startGame(); // chiama la funzione al caricamento della pagina

var modalFind = document.querySelector('#modal');

//#region ---------------- Traccia (1) --------------------

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

//#endregion

//#region ------------- Implementazione 1) Countdown Partita ---------------------
//@desc Chiamare una funzione ogni tot millisecondi che avra' un counter--; countdown entro il quale termina la partita

let timer = document.querySelector('.text-center .timer');
let sec = 10; // valori di partenza  
let min = 0;
printTimer();
setInterval(countdown, 1000); // richiama la funzione ogni secondo

function countdown() {

    sec--;         // secondi decrescono al richiamo della funzione
    if(sec <= 0) { // se i secondi sono inferiori/uguali a 0
        min--;     // i minuti scendono di 1
        sec = 59;  // i secondi salgono a 59
    }
    printTimer();
    countdown_stop();
}

function countdown_stop() {

    if(min <= -1) { 
        clearInterval(countdown); // stop al countdown
        printResult();            // stampa game over
        min = 0;
        sec = 0;
    }
}

function printTimer() {
    timer.innerHTML = 'Tempo: ' + +min + ' min ' + +sec + ' sec';
}
function printResult() {
    timer.innerHTML = 'Game Over. Hai perso!';
}

//#endregion

//#region ---------------- Traccia (2) --------------------

// una funzione che rimuove la classe active e chiama la funzione startGame()
// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, (alla var gli passo tutte le icone, lo ciclo e per ogni elemento creo una card)
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

//#endregion

//#region ------------- Implementazione 2) Creazione dei div per Contenitore e Icone ---------------------

/* function restart() {

    startGame();
} */



function startGame() {
    var arrayShuffle = shuffle(arrayAnimali);                 // gli passo la funzione shuffle con all'interno le icone                
    var iconsFind = document.getElementById('griglia');       // assegno alla var cards il div html (non il contenuto)
    iconsFind.innerHTML = '';                                 // pulisco tutto il contenuto
    
    for(i=0; i<24; i++) {
        let divCont = document.createElement('div');          // div contenitore
        let divIcon = document.createElement('div');          // div con icona dentro
        divIcon.className = 'icon';                           // assegno classe icon
        
        iconsFind.appendChild(divCont).appendChild(divIcon);  // assegno il div alla destinazione e assegno le icone
        divIcon.innerHTML = arrayShuffle[i];                  // assegno shuffle(icone) nel div delle icone
        
/*         let iconClass = document.getElementsByClassName('icon');
        iconClass.addEventListener('click', function(){

            shuffle(a);
            displayIcon();
            
        }) */
    }
}

//#endregion

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