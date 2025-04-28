// Recupero il container dove verranno inserite le card
const container = document.getElementById(`container`);

// Recupero l'URL dell'API che fornisce le immagini
const randomCardsAPI = `https://lanciweb.github.io/demo/api/pictures/`;

// Eseguo una chiamata HTTP GET all'API per ottenere le immagini
axios
    .get(randomCardsAPI)
    .then(response => {
        const randomCards = response.data;
        console.table(randomCards); // Stampo i dati ricevuti in formato tabellare per debug

        // Creo un contenitore "row" per le card
        const row = document.createElement(`div`);
        row.classList.add(`row`);

        // Ciclo ogni card ricevuta e costruisco il relativo markup HTML
        randomCards.forEach(card => {
            const col = document.createElement(`div`);
            col.classList.add(`col`);

            // Inserisco la struttura HTML della card all'interno della colonna
            col.innerHTML = ` <div class="col">
                <div class="card">
              <img class="pin" src="./img/pin.svg" alt="pin">
              <img class="card-img" src="${card.url}" alt="randompic">
              <div class="card-body">
                <div class="date">${card.date}</div>
                <div class="title card-title">${card.title}</div>
              </div>
                </div>
                </div> `
            
            // Aggiungo la colonna alla riga
            row.append(col);
        });

        // Aggiungo la riga completa al contenitore principale
        container.append(row);

        // Seleziono tutte le card appena create
        const cardsNodes = document.querySelectorAll(`.card`);
        console.log(cardsNodes); // Debug: stampa le card nel console log

        // Seleziono l'elemento overlay per visualizzare l'immagine in evidenza
        const overlay = document.querySelector(`.overlay`);

        // Aggiungo un event listener per ogni card per gestire il click
        cardsNodes.forEach(cardsNode => {
          console.log(cardsNode); // Debug: stampa il nodo della card cliccata

          cardsNode.addEventListener (`click`, () => {

            // Recupero l'immagine dalla card cliccata
            const activePic = cardsNode.querySelector(`.card-img`);
            console.log(activePic); // Debug: stampo l'immagine selezionata

            // Aggiungo l'immagine selezionata all'overlay
            overlay.innerHTML += `
              <img class="active-pic" src="${activePic.src}" alt="active pic">`;

            // Rendo visibile l'overlay rimuovendo la classe che lo nasconde
            overlay.classList.remove(`d-none`);

            // Seleziono il pulsante di chiusura (già presente nell'overlay)
            const closeButton = document.getElementById(`close-button`);

            // Aggiungo l'event listener al pulsante di chiusura
            closeButton.addEventListener(`click`, () => {
             console.log(overlay); // Debug: verifico lo stato dell'overlay

             // Nascondo l'overlay riapplicando la classe `d-none`
             overlay.classList.add(`d-none`);

             // Ripristino il contenuto dell'overlay solo con il pulsante di chiusura
             overlay.innerHTML = `<button id="close-button">Chiudi</button>`;
            });
          });
        });
      });
