import React, { Component } from 'react';
import CardModule from '../components/CardModule';
import test from '../models/forms/sampleCard';
import { connect } from "react-redux";

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

// sample card with close
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample Card Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <CardModule
          attributes={null}
          model={test}
          componentStyle={null}
          reduxID="sampleCard"
          route="testcalls"
          language={this.props.reduxlang}
          closed={this.props.moduleState && this.props.moduleState.module_closed}
          clickHandlerOther={e => {
            console.log('some action');
          }}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  // state refers to global redux state
  return {
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath,
    moduleState: state.moduleStates && state.moduleStates["moduledata_sampleCard"]
  };
}

export default connect(mapStateToProps)(App);
