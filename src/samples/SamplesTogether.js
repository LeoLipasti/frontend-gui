import React, { Component } from 'react';
import FrameModule from '../components/FrameModule';
import CardModule from '../components/CardModule';
import ListModule from '../components/ListModule';
import TableModule from '../components/TableModule';

import testCard from '../models/forms/sampleCard';
import testFame from '../models/forms/sampleCard';
import testList from '../models/lists/sampleList';
import testTable from '../models/tables/sampleTable';
import store from '../redux/store/store'
import { tableData } from '../redux/actions/modules/tableData'
import testdata from '../dev/testdata';

import { connect } from "react-redux";

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

// sample card with close
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
      <div  style={{ width: '100vw', height: '100vh'}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Samples</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <CardModule
          classnames={''}
          inlinestyle={null}
          attributes={null}
          model={testCard}
          reduxID="sampleCard"
          route="testcalls"
          language={this.props.reduxlang}
          closed={this.props.moduleState && this.props.moduleState.module_closed}
          clickHandlerOther={e => {
            console.log('some action');
          }}
        />
        <TableModule
          classnames={''}
          inlinestyle={{ display: 'inline-block', width: '40vw', height: '100vh'}}
          model={testTable}
          attributes={!!this.props.sampleProfiles && this.props.sampleProfiles}
          lang={this.props.reduxlang}
        />
        <FrameModule
          classnames={''}
          inlinestyle={{display: 'inline-block', width: '35vw', height: '100vh'}}
          attributes={null}
          model={testFame}
          reduxID="sampleFrame"
          route="testcalls"
          language={this.props.reduxlang}
          clickHandlerOther={e => {
            console.log('some action');
          }}
        />
        <ListModule
          classnames={''}
          inlinestyle={{ display: 'inline-block', width: '25vw', height: '100vh'}}
          model={testList}
          attributes={!!this.props.sampleProfiles && this.props.sampleProfiles}
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
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath,
    moduleState: state.moduleStates && state.moduleStates["moduledata_sampleCard"]
  };
}

export default connect(mapStateToProps)(App);
