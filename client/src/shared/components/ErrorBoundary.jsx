import React, { Component } from "react";
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      message: "",
    });
  };

  render(){
    if(this.state.hasError){
        return (
        <div className="min-h-screen flex items-center justify-center bg-black text-text-primary">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-danger font-sans uppercase tracking-wider text-sm">
              SYSTEM_ERROR
            </p>

            <h1 className="text-text-primary text-2xl">
              Something went wrong.
            </h1>

            <p className="text-text-secondary text-sm">
              {this.state.message}
            </p>

            <button
              onClick={this.handleReset}
              className="border border-danger text-danger px-4 py-2 font-sans hover:bg-danger-dim"
            >
              REBOOT
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
