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

export default class TableView extends Component<TableProps> {
  constructor(props: TableProps) {
    super(props);

    this.state = {
      data: Array,
      loading: true,
      error: null,
      searchString: this.props.searchString,
    };
  }
  state = {
    data: Array,
    loading: true,
    error: null,
    searchString: '',
  };

  async componentDidMount() {
    try {
      if (this.props.searchString == '') {
        const data = await fetchData();
        this.setState({ data: data.results, loading: false });
      } else {
        const data = await fetchData();
        const result = data.results.filter((item) => {
          item.name.includes(this.props.searchString);
        });
        this.setState({ data: result, loading: false });
      }
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
