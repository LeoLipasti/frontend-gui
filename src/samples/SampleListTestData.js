import React, { Component } from 'react';
import List from '../modules/List';
import { connect } from "react-redux";
import { tableData } from '../redux/actions/tableData'
import store from '../redux/store/store'
import test from '../models/lists/sampleList';
import testdata from '../dev/testdata';

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  componentDidMount() {
    store.dispatch(tableData({ data: testdata.data, tablename: 'sampleProfiles' }));
  }
  render() {
    return (
      <div style={{ width: '50vw', height: '20vh', border: '1px solid black'}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample List Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <List
          contentArray={test}
          attributes={!!this.props.sampleProfiles && this.props.sampleProfiles}
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
    sampleProfiles: state.tableData && state.tableData.sampleProfiles && state.tableData.sampleProfiles,
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath

  };
}

export default connect(mapStateToProps)(App);
