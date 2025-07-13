import { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchComponentProps {}

//class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
export default class Search extends Component {
  constructor(props: SearchComponentProps) {
    super(props);
    const searchInput = String(localStorage.getItem('searchInput'));
    this.state = { inputValue: searchInput, isError: false };

    this.causeSimulatedError = this.causeSimulatedError.bind(this);
  }
  state = {
    inputValue: '',
    isError: false,
  };

  handleInputSearchValue = () => {
    localStorage.setItem('searchInput', this.state.inputValue);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  causeSimulatedError() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      // Throwing a real Error object with dynamic state
      throw new Error(`En error has been occured!`);
    }
    return (
      <>
        <div>
          <input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          ></input>
          <button onClick={this.handleInputSearchValue}>Search</button>
          <button onClick={this.causeSimulatedError}>Error button</button>
        </div>
      </>
    );
  }
}
