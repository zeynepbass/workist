import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <div role="alert" className="flex flex-col items-center gap-4 p-10 text-center">
        <p className="text-lg text-gray-700">Bir şeyler ters gitti.</p>
        <button
          type="button"
          className="rounded bg-purple-600 px-4 py-2 text-white"
          onClick={() => this.setState({ error: null })}
        >
          Tekrar dene
        </button>
      </div>
    );
  }
}
