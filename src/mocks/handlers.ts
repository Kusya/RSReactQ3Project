import { http, HttpResponse } from 'msw';

export const handlers = [
  // Succesful responce
  http.get('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0', () => {
    return HttpResponse.json({
      results: [
        { name: 'bulbasaur', url: ' https://pokeapi.co/api/v2/pokemon/1/ ' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/ ' },
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/ ' },
      ],
    });
  }),
];
