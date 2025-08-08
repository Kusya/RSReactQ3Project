import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0', () => {
    return HttpResponse.json({
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/ ' },
        { name: 'bulbasaur', url: ' https://pokeapi.co/api/v2/pokemon/1/ ' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/ ' },
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/ ' },
      ],
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;

    if (name === 'pikachu') {
      return HttpResponse.json({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
        stats: [
          {
            base_stat: 90,
            effort: 3,
            stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
          },
        ],
      });
    }
    if (name === 'bulbasaur') {
      return HttpResponse.json({
        id: 1,
        name: 'bulbasaur',
        height: 4,
        weight: 60,
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        stats: [
          {
            base_stat: 90,
            effort: 3,
            stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
          },
        ],
      });
    }
    if (name === 'charmander') {
      return HttpResponse.json({
        id: 4,
        name: 'charmander',
        height: 4,
        weight: 60,
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        },
        stats: [
          {
            base_stat: 90,
            effort: 3,
            stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
          },
        ],
      });
    }
    if (name === 'squirtle') {
      return HttpResponse.json({
        id: 7,
        name: 'charmander',
        height: 4,
        weight: 60,
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        },
        stats: [
          {
            base_stat: 90,
            effort: 3,
            stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
          },
        ],
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.get(
    'https://pokeapi.co/api/v2/pokemon/999',
    () => new HttpResponse(null, { status: 404 })
  ),
];
