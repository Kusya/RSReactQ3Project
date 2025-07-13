import { Component } from 'react';

export const fetchData = async () => {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
  );
  if (!response.ok) throw new Error('Error loaging data');
  return await response.json();
};

export default class TableView extends Component {
  state = {
    data: Array,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const data = await fetchData();
      this.setState({ data: data.results, loading: false });
    } catch (err: Error) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (data == null || data.length <= 0) return <div>No items found</div>;

    return (
      <div>
        <h3>Pokemons</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Url</th>
          </tr>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                <a href={item.url}>href</a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
