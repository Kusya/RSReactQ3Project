import { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchComponentProps {}

//class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
export default class Search extends Component {
  constructor(props: SearchComponentProps) {
    super(props);
    const searchInput = String(localStorage.getItem('searchInput'));
    this.state = { inputValue: searchInput };
    //this.handleInputSearchValue = this.handleInputSearchValue.bind(this);
  }
  state = {
    inputValue: '',
  };

  handleInputSearchValue = () => {
    localStorage.setItem('searchInput', this.state.inputValue);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  render() {
    return (
      <>
        <div>
          <input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          ></input>
          <button onClick={this.handleInputSearchValue}>Search</button>
        </div>
      </>
    );
  }
}
