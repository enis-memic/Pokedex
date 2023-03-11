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
  for (let i = 1; i <= 25; i++) {
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
  <img src="${pokemon.sprites.front_default}" alt="" />
  <h4 class="type">Type: ${type}</h4>`;

  pokemonEl.innerHTML = pokemonInnerhtml;
  pokeCards.appendChild(pokemonEl);
};
