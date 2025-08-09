import { http, HttpResponse } from 'msw';
import { POKEMON_URL } from './../../app/constants';

export const handlers = [
  http.get(POKEMON_URL + 'pokemon?limit=1000&offset=0', () => {
    return HttpResponse.json({
      results: [
        { name: 'pikachu', url: POKEMON_URL + 'pokemon/25/ ' },
        { name: 'bulbasaur', url: POKEMON_URL + 'pokemon/1/ ' },
        { name: 'charmander', url: POKEMON_URL + 'pokemon/4/ ' },
        { name: 'squirtle', url: POKEMON_URL + 'pokemon/7/ ' },
      ],
    });
  }),
  http.get(POKEMON_URL + 'pokemon/:name', ({ params }) => {
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
            stat: { name: 'speed', url: POKEMON_URL + 'stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: POKEMON_URL + 'stat/2/' },
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
            stat: { name: 'speed', url: POKEMON_URL + 'stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: POKEMON_URL + 'stat/2/' },
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
            stat: { name: 'speed', url: POKEMON_URL + 'stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: POKEMON_URL + 'stat/2/' },
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
            stat: { name: 'speed', url: POKEMON_URL + 'stat/6/' },
          },
          {
            base_stat: 55,
            effort: 0,
            stat: { name: 'attack', url: POKEMON_URL + 'stat/2/' },
          },
        ],
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.get(
    POKEMON_URL + 'pokemon/999',
    () => new HttpResponse(null, { status: 404 })
  ),
];
