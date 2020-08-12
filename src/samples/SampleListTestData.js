import React, { Component } from 'react';
import ListPresenter from '../components/ListPresenter';
import { connect } from "react-redux";
import { res_responseStates } from '../redux/actions/responses/responseStates'
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
    store.dispatch(res_responseStates({ data: testdata.data, type: 'sampleProfiles' }));
  }
  render() {
    return (
      <div style={{ width: '50vw', height: '20vh', border: '1px solid black'}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample List Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <ListPresenter
          classnames={''}
          inlinestyle={null}
          model={'sampleList'}
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
    sampleProfiles: state.res_responseStates && state.res_responseStates.sampleProfiles && state.res_responseStates.sampleProfiles,
    reduxlang: state['appPath'] && state['appPath']['appPath'] && state['appPath']['appPath']

  };
}

export default connect(mapStateToProps)(App);
