import { Component } from 'react';

export const fetchData = async () => {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
  );
  if (!response.ok) throw new Error('Error loaging data');
  return await response.json();
};

interface TableProps {
  searchString: string;
}

type PokeItem = {
  name: string;
  url: string;
};

export default class TableView extends Component<TableProps> {
  constructor(props: TableProps) {
    super(props);

    this.state = {
      pokeList: [],
      loading: true,
      error: null,
      searchString: this.props.searchString,
    };
  }
  state = {
    pokeList: [],
    loading: true,
    error: null,
    searchString: '',
  };

  loadData = async () => {
    const searchString = this.state.searchString;
    try {
      const data = await fetchData();
      const filtered = searchString
        ? data.results.filter((item: PokeItem) =>
            item.name.includes(searchString.toLowerCase())
          )
        : data.results;
      this.setState({ pokeList: filtered, loading: false });
    } catch (err) {
      this.setState({
        error: err instanceof Error ? err.message : 'Error',
        loading: false,
      });
    }
  };

  async componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: TableProps) {
    if (prevProps.searchString !== this.props.searchString) {
      this.setState({ searchString: this.props.searchString }, () => {
        this.loadData();
      });
    }
  }

  render() {
    const { pokeList, loading, error } = this.state;

    if (loading) return <div id="pokemonTable">Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (pokeList == null || pokeList.length <= 0)
      return <div>No items found</div>;

    return (
      <div>
        <h3>Pokemons</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            {pokeList.map((item: PokeItem) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  <a href={item.url}>href</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
