const pokeCards = document.querySelector('#poke-cards');

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
  pokemonInnerhtml = `
  <h3>${pokemonName}</h3>
  <img src="${pokemon.sprites.front_default}" alt="" />
  <h4 class="type">${poke_types}</h4>`;

  pokemonEl.innerHTML = pokemonInnerhtml;
  pokeCards.appendChild(pokemonEl);
};
