import React, { Component } from 'react';
import Table from '../modules/Table';
import { connect } from "react-redux";
import { tableData } from '../redux/actions/tableData'
import store from '../redux/store/store'
import test from '../models/tables/sampleTable';
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
      <div style={{ width: '60vw', height: '60vh', border: '1px solid black', overflow: "scroll"}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Sample Table Test Data</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <Table
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
