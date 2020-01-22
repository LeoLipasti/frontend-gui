import React, { Component } from 'react';
import Card from './modules/Card';
import auth from './models/forms/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div>
        <Card
          clickHandlerClose={null}
          clickHandlerSubmit={e => {
            this.setState(e);
            console.log('submit');
          }}
          clickHandlerOther={e => {
            this.setState(e);
            console.log('other');
          }}
          inputHandlerFocus={e => {
            this.setState(e);
          }}
          inputHandlerChange = {e => {
            this.setState(e);
          }}
          contentArray={auth}
          attributes={null}
          componentStyle={null}
        />
      </div>
    )
  }
}

export default App;
