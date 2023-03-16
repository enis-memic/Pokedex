const pokeCards = document.querySelector('#poke-cards');
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};
const main_types = Object.keys(colors);

const fetchPokemon = async () => {
  for (let i = 1; i <= 36; i += 3) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  CreatePokemonCard(pokemon);
};
fetchPokemon();
const CreatePokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('card');
  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_types = pokemon.types.map((el) => el.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;
  pokemonInnerhtml = `
  <h3>${pokemonName}</h3>
  <img src="${pokemon.sprites.front_default}" alt="Pokemon image" />
  <h4 class="type">Type: ${type}</h4>
  <button>More about</button>
  
  `;

  pokemonEl.innerHTML = pokemonInnerhtml;
  pokeCards.appendChild(pokemonEl);

  const popupButton = pokemonEl.querySelector('button');
  popupButton.addEventListener('click', () => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.backgroundColor = color;
    popup.innerHTML = `
      <p class="close">X</p>
      <h3>More information about ${pokemonName}</h3>
      <img class="popup-img" src="${pokemon.sprites.back_shiny}" alt="Pokemon image" />
      <h4>Type: ${pokemon.types[0].type.name}</h4>
      <div class="popup-stats">
      <h3>Abilities</h3>
      <p>ATTACK: ${pokemon.stats[1].base_stat} </p>
      <p>DEFENSE: ${pokemon.stats[2].base_stat} </p>
      <p>SPEED: ${pokemon.stats[5].base_stat}</p>
      </div>
      <div class="popup-moves">
      <h3>Moves</h3>
      <p>Move 1: ${pokemon.moves[0].move.name}</p>
      <p>Move 2: ${pokemon.moves[1].move.name}</p>
      <p>Move 3: ${pokemon.moves[2].move.name}</p>
      <p>Move 4: ${pokemon.moves[3].move.name}</p>
      </div>
    `;
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.appendChild(popup);
    document.body.appendChild(modal);
    const form = modal.querySelector('div');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      console.log(`Reservation submitted for ${name} (${email})`);
      document.body.removeChild(modal);
    });
    const closeBtn = popup.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  });
};
