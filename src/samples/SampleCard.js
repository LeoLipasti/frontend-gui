import React, { Component } from 'react';
import CardPresenter from '../components/CardPresenter';
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
        <CardPresenter
          classnames={''}
          inlinestyle={null}
          model={'sampleCard'}
          reduxID="sampleCard"
          route="testcalls"
          language={this.props.reduxlang}
          closed={this.props.requestState && this.props.requestState.module_closed}
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
    reduxlang: state['appPath'] && state['appPath']['appPath'] && state['appPath']['appPath'],
    requestState: state.req_requestStates && state.req_requestStates["sampleCard"]
  };
}

export default connect(mapStateToProps)(App);
