import React, { Component } from 'react';
import ChartJS from '../components/chartjs/ChartJS';
import { connect } from "react-redux";

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

// sample charts
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
          <title>Sample Charts</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <ChartJS
          type='bar'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
        />
        <ChartJS
          type='bubble'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
        />
        <ChartJS
          type='line'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
        />
        <ChartJS
          type='pie'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
        />
        <ChartJS
          type='polarArea'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
        />
        <ChartJS
          type='radar'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
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
