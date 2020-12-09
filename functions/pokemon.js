const axios = require('axios');

const listarPokemon = async(limit) => {

  const instance = axios.create({
    baseURL: `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
  });

  const resp = await instance.get();

  if (!Number(limit)) {
    throw new Error(`No es un numero el limite '${limit}'`);
  }

  const pokemons = [];

  for (const pokemon of resp.data.results) {
    const informacion = await obtenerInformacionPokemon(pokemon.name);

    pokemons.push({
      nombre: pokemon.name,
      habilidades: informacion.habilidades,
      img: informacion.sprites
    });
  }

  return pokemons;
}

const obtenerInformacionPokemon = async(pokemon) => {
  const instance = axios.create({
    baseURL: `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  });

  const resp = await instance.get();

  return {
    habilidades: resp.data.abilities,
    sprites: resp.data.sprites.back_default
  };
}

module.exports = {
  listarPokemon
}