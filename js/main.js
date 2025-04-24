const container = document.getElementById(`container`);
const randomCardsAPI = `https://lanciweb.github.io/demo/api/pictures/`;

axios
    .get(randomCardsAPI)
    .then(response => {
        const randomCards = response.data;
        console.table(randomCards);

        const row = document.createElement(`div`);
        row.classList.add(`row`);

        
        randomCards.forEach(card => {
            const col = document.createElement(`div`);
            col.classList.add(`col`);

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
            
            row.append(col);
        });
        container.append(row);
    });
