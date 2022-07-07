import express from 'express';

// SETUP
const app = express();
const port = 3001;
app.use(express.json());

interface Pokemon {
  name: string;
  level: number;
}

let pokedex: Pokemon[] = []; // data store Array<Pokemon>

app.post('/catch', (request, response) => { // route = CATCH, METHOD = POST
  const { pokemon, level } = request.body; // request.body = { pokemon: 'Pikachu', level: 10, type: 'grass }
  pokedex.push({ name: pokemon, level }); // Functionality
  response.json({ name: pokemon }); // Pay attention to this for testing
});

// 1. Get the entire pokedex
// 2. (Optionally) Want to get a specific pokemon
app.get('/pokedex', (request, response) => {
  const pokemonName = request.query.pokemon as string; // http://localhost:3001/pokedex
  if (pokemonName) {
    const foundPokemon = pokedex.find((p) => p.name === pokemonName)
    if (foundPokemon) {
      response.json([pokedex.find((p) => p.name === pokemonName)]); /// array of 1 pokemon
    } else {
      response.json([]);
    }
  } else {
    response.json(pokedex); // array of potentially multiple
  }
});


app.put('/edit', (request, response) => {
  const { pokemon, level } = request.body;
  const findPokemon = pokedex.find((p) => p.name === pokemon);
  if (findPokemon) {
    pokedex = [...pokedex, { ...findPokemon, level }];
    response.json({ pokemon, level });
  } else {
    response.json({ error: 'Could not find pokemon in pokedex' });
  }
});

app.delete('/delete', (request, response) => {
  const pokemon = request.body.pokemon;
  const findPokemon = pokedex.find((p) => p.name === pokemon);
  if (findPokemon) {
    pokedex = [...pokedex].filter((p) => p.name !== pokemon);
    response.json({});
  } else {
    response.json({ error: 'Could not find pokemon in pokedex' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // While true
});
