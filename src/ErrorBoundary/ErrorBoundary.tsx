import React, { Component } from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error catched:', error, errorInfo);
  }

  render() {
    if ((this.state as State).hasError) {
      return <h1>Something went wrong!</h1>;
    }

    return this.props.children;
  }
}
