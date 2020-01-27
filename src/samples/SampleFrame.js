import React, { Component } from 'react';
import Frame from '../modules/Frame';
import test from '../models/forms/sampleCard';
import { connect } from "react-redux";

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div style={{ width: '50vw', height: '20vw', border: '1px solid black'}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample Frame Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <Frame
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
          lang={this.props.reduxlang}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  // state refers to global redux state
  return {
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath

  };
}

export default connect(mapStateToProps)(App);
