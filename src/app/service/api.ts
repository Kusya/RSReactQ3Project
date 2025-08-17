import type { PageParams } from './../../types/PageParams';
const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';

class PokeApiService {
  fetchData = async () => {
    const response = await fetch(pokeUrl + '?limit=10000&offset=0');
    if (!response.ok) throw new Error('Error loaging data');
    return await response.json();
  };
  fetchDataByPage = async ({ limit = 10, pageNumber = 1 }: PageParams) => {
    const response = await fetch(
      pokeUrl + `?limit=${limit}&offset=${(pageNumber - 1) * limit}`
    );
    if (!response.ok) throw new Error('Error loaging data');
    return await response.json();
  };
  fetchItemById = async (id: string) => {
    const response = await fetch(`${pokeUrl}/${id}/`);
    if (!response.ok) throw new Error('Error loaging data');
    return await response.json();
  };
  fetchItemByName = async (name: string) => {
    const response = await fetch(`${pokeUrl}/${name}/`);
    if (!response.ok) throw new Error('Error loaging data');
    return await response.json();
  };
}
export default new PokeApiService();
