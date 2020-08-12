import React, { Component } from 'react';
import TablePresenter from '../components/TablePresenter';
import { connect } from "react-redux";
import { req_requestStates } from '../redux/actions/requests/requestStates'
import store from '../redux/store/store'
import testdata from '../dev/testdata';

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  componentDidMount() {
    store.dispatch(req_requestStates({ data: testdata.data, type: 'sampleProfiles' }));
  }
  render() {
    return (
      <div style={{ width: '60vw', height: '60vh', border: '1px solid black', overflow: "scroll"}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample Table Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <TablePresenter
          classnames={''}
          inlinestyle={null}
          model={'sampleTable'}
          lang={this.props.reduxlang}
          reduxID="sampleProfiles"
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  // state refers to global redux state
  return {
    sampleProfiles: state.res_responseStates && state.res_responseStates['sampleProfiles'] && state.res_responseStates['sampleProfiles'],
    reduxlang: state['appPath'] && state['appPath']['appPath'] && state['appPath']['appPath']
  };
}

export default connect(mapStateToProps)(App);
