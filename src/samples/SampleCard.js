import React, { Component } from 'react';
import Card from '../modules/Card';
import test from '../models/forms/sampleCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div>
        <Card
          clickHandlerClose={() => {
            this.setState({ substep: null });
            console.log("close");
          }}
          clickHandlerSubmit={e => {
            this.setState(e);
            console.log("submit states");
          }}
          clickHandlerOther={e => {
            this.setState(e);
            console.log("some action");
          }}
          inputHandlerFocus={e => {
            this.setState(e);
            console.log("focus");
          }}
          inputHandlerChange = {e => {
            this.setState(e);
            console.log("changed state");
          }}
          contentArray={test}
          attributes={null}
          componentStyle={null}
        />
      </div>
    )
  }
}

export default App;
