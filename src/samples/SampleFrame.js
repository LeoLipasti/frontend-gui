import React, { Component } from 'react';
import FrameModule from '../components/FrameModule';
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
      <div>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample Frame Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <FrameModule
          classnames={''}
          inlinestyle={{display: 'inline-block', width: '75vw', height: '100vh'}}
          model={test}
          attributes={null}
          reduxID="sampleFrame"
          route="testcalls"
          language={this.props.reduxlang}
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
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath

  };
}

export default connect(mapStateToProps)(App);
