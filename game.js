// array delle tessere
let tiles = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];

// letiabile per contare il numero di mosse effettuate dal giocatore
let counterMoves = 0;

// letiabile per selezionare l'elemento HTML dove verrà mostrato il numero di mosse effettuate
let movesOnScreen = document.querySelector("h2");

//Funzione eseguita quando una tessera viene cliccata
function pushed(id) {
	let btn = document.getElementById(id);

	//Verifica che la tessera cliccata non sia già vuota
	if (btn.firstChild.data != " ") {
		//Trova l'id della tessera vuota
		blankTileId = findTile(" ");
		//Verifica se è possibile spostare la tessera cliccata, nella posizione della tessera vuota
		if (canMove(id, blankTileId) == false) return;
		//Cambia il valore visualizzato della tessera vuota con quello della tessera cliccata
		document.getElementById(blankTileId).firstChild.data = btn.firstChild.data;
		//Cambia il valore visualizzato della tessera cliccata con uno spazio vuoto
		btn.firstChild.data = " ";
	}
}

//Funzione per trovare l'id della tessera con un determinato valore (in questo caso la tessera vuota)
function findTile(val) {
	for (i = 0; i < tiles.length; i++) {
		if (document.getElementById(tiles[i]).firstChild.data == val) {
			return tiles[i];
		}
	}
}

//Funzione per verificare se è possibile spostare una tessera in una posizione specifica
function canMove(id, blankTileId) {
	let nearby = [];

	//Verifica se la tessera vuota si trova in un bordo della griglia
	if ([2, 5, 8].includes(parseInt(blankTileId[1]))) {
		//Se si trova in un bordo, le tessere adiacenti possibili sono quelle sopra, sotto e a sinistra
		nearby = [+3, -3, -1];
	} else if ([0, 3, 6].includes(parseInt(blankTileId[1]))) {
		//Se si trova in un bordo, le tessere adiacenti possibili sono quelle sopra, sotto e a destra
		nearby = [+3, +1, -3];
	} else {
		//Se si trova al centro, le tessere adiacenti possibili sono quelle sopra, sotto, a destra e a sinistra
		nearby = [+3, +1, -3, -1];
	}

	//Ciclo per verificare se la tessera cliccata è adiacente alla tessera vuota
	for (i = 0; i < tiles.length; i++) {
		if (parseInt(blankTileId[1]) + parseInt(nearby[i]) == parseInt(id[1])) {
			//Se si', aumenta il contatore delle mosse e mostra il nuovo valore sullo schermo
			counterMoves++;
			movesOnScreen.textContent = `Numero mosse: ${counterMoves}`;
			movesOnScreen.style.visibility = "visible";

			return true;
		}
	}

	return false;
}

//Funzione per verificare se la disposizione iniziale delle tessere è risolvibile
function solvable(rndList) {
	let count = 0;
	//Ciclo per contare il numero di coppie di tessere non ordinate
	for (i = 0; i < rndList.length - 1; i++) {
		if (rndList[i] == 0) {
			continue;
		}

		for (j = i + 1; j < rndList.length; j++) {
			if (rndList[j] == 0) {
				continue;
			} else if (rndList[i] > rndList[j]) {
				count++;
			}
		}
	}

	//Se il numero di coppie non ordinate è pari, allora la disposizione è risolvibile
	if (count % 2 == 0) {
		return true;
	} else {
		return false;
	}
}

//Funzione per generare una disposizione iniziale casuale delle tessere e verificare se è risolvibile
function randomTiles() {
	let rndList = [];

	//Reimposta il contatore delle mosse e lo mostra sullo schermo
	counterMoves = 0;
	movesOnScreen.textContent = `Numero mosse: ${counterMoves}`;

	while (true) {
		//Genera una disposizione casuale delle tessere
		rndList = [];

		while (rndList.length < 9) {
			let randomnumber = Math.ceil(Math.random() * 9) - 1;

			if (rndList.indexOf(randomnumber) > -1) continue;

			rndList[rndList.length] = randomnumber;
		}

		//Verifica se la disposizione casuale generata è risolvibile
		if (solvable(rndList)) {
			break;
		}
	}

	//Assegna i valori generati casualmente alle tessere del gioco
	for (i = 0; i < tiles.length; i++) {
		if (rndList[i] == 0) {
			val = " ";
		} else {
			val = rndList[i].toString();
		}

		document.getElementById(tiles[i]).firstChild.data = val;
	}
}
