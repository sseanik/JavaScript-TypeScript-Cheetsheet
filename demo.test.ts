import request from 'sync-request';

describe('Test Pokedex', () => {
  test('Catching a Pokemon', () => {

    
    const response = request('POST', 'http://localhost:3001/catch', {
      body: JSON.stringify({ pokemon: 'Pikachu', level: 10 }), //
      headers: {
        'content-type': 'application/json',
      },
    }); 

    console.log(response)
    const responseObject = JSON.parse(response.getBody() as string);
    // TEST
    expect(responseObject).toStrictEqual({ name: 'Pikachu' });

    request('POST', 'http://localhost:3001/catch', {
      body: JSON.stringify({ pokemon: 'Charmander', level: 12 }),
      headers: {
        'content-type': 'application/json',
      },
    });
  });
  
  test('Reading Pokedex', () => {
    const response = request('GET', 'http://localhost:3001/pokedex');
    const responseObject = JSON.parse(response.getBody() as string);
    expect(responseObject).toStrictEqual([
      { name: 'Pikachu', level: 10 },
      { name: 'Charmander', level: 12 },
    ]);
  });

  // request -> supply
  // 1. A METHOD
  // 2. URL
  // 3. Query String object? (optional)
  test('Reading Pokedex for specific Pokemon', () => {
    const response = request('GET', 'http://localhost:3001/pokedex', {
      qs: {
        pokemon: 'Pikachu',
      },
    });
    const responseObject = JSON.parse(response.getBody() as string);
    expect(responseObject).toStrictEqual([{ name: 'Pikachu', level: 10 }]);
  });

  test('Reading Pokedex for specific Pokemon', () => {
    const response = request('GET', 'http://localhost:3001/pokedex?pokemon=Pikachu');
    const responseObject = JSON.parse(response.getBody() as string);
    expect(responseObject).toStrictEqual([{ name: 'Pikachu', level: 10 }]);
  });

  test('Reading Pokedex for specific Pokemon', () => {
    const response = request('GET', 'http://localhost:3001/pokedex?pokemon=Mewtwo');
    const responseObject = JSON.parse(response.getBody() as string);
    expect(responseObject).toStrictEqual([]);
  });
});
