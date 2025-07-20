import { Component } from 'react';

interface SearchComponentProps {
  sendSearchUp: (data: string) => void;
}

export default class Search extends Component<SearchComponentProps> {
  state = {
    searchString: localStorage.getItem('searchInput') || '',
    isError: false,
  };
  handleInputSearchValue = () => {
    localStorage.setItem('searchInput', this.state.searchString);
    this.props.sendSearchUp(this.state.searchString);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: e.currentTarget.value,
    });
  };

  causeSimulatedError = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error(`En error has been occured!`);
    }
    return (
      <>
        <div>
          <input
            name="search-input"
            value={this.state.searchString}
            onChange={this.handleInputChange}
          ></input>
          <button onClick={this.handleInputSearchValue}>Search</button>
          <button onClick={this.causeSimulatedError}>Error button</button>
        </div>
      </>
    );
  }
}
