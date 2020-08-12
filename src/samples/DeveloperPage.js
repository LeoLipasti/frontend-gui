import React, { Component } from 'react';
import FramePresenter from '../components/FramePresenter';
import CardPresenter from '../components/CardPresenter';
import ListPresenter from '../components/ListPresenter';
import TablePresenter from '../components/TablePresenter';
import NavPresenter from '../components/NavPresenter';

import store from '../redux/store/store'
import { res_responseStates } from '../redux/actions/responses/responseStates'
import testdata from '../dev/testdata';
import ChartJS from '../components/chartjs/ChartJS';

import colorsIndex from '../style/chartjs/colorsIndex';

import { connect } from "react-redux";

import lang from '../lang/index'
import { Helmet } from 'react-helmet';

import jsonFetch from '../fetch/jsonFetch';

const colorStyles = Object.keys(colorsIndex);
const colorBarStyles = {flex: '1'}

// Contains most things fit together to see styling
// useful for frontend dev. Import this in index
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  componentDidMount() {
    store.dispatch(res_responseStates({ data: testdata.data, type: 'sampleProfiles' }));
    jsonFetch( '/tokens/0', { method: 'GET' }, false );
  }
  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white'}}>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
          <title>Samples</title>
          <meta name="”ROBOTS”" content="NOINDEX, FOLLOW" />
        </Helmet>
        <NavPresenter
          reduxID="Dashboard"
          route="testcalls"
          language={this.props.reduxlang}
          closed={false}
        />
        <div className='chart_container'>
          <ChartJS
          type='bar'
          title='Sales'
          labels={["Jan", "Feb", "March", "Apr", "May", "June"]}
          data={[86, 2, 115, 86, 2, 115]}
          color={'rgbColors'}
          />
        </div>
        <div className='chart_container'>
          <ChartJS
            type='bar'
            title='Sales'
            labels={["Jan", "Feb", "March"]}
            data={[86, 2, 115]}
            color={'newretroColors'}
          />
        </div>
        <div className='chart_container'>
          <ChartJS
            type='line'
            title='Sales'
            labels={["Jan", "Feb", "March"]}
            data={[86, 2, 115]}
            color={['silver','green','blue']}
          />
        </div>
        <div className='chart_container'>
          <ChartJS
            type='pie'
            title='Sales'
            labels={["Jan", "Feb", "March"]}
            data={[86, 2, 115]}
          />
        </div>
        <div className='chart_container'>
          <ChartJS
            type='polarArea'
            title='Sales'
            labels={["Jan", "Feb", "March"]}
            data={[86, 2, 115]}
          />
        </div>
        <div className='chart_container'>
          <ChartJS
            type='radar'
            title='Sales'
            labels={["Jan", "Feb", "March"]}
            data={[86, 2, 115]}
          />
        </div>
        <div className='chart_container'>
        <ChartJS
          type='doughnut'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}
        />
      </div>
        <CardPresenter
          classnames={''}
          inlinestyle={null}
          attributes={null}
          model={'sampleCard'}
          route="testcalls"
          language={this.props.reduxlang}
          closed={this.props.requestState && this.props.requestState.module_closed}
          clickHandlerOther={e => {
            console.log('some action');
          }}
          exclude={['info','story']}
          reduxID="developerPage-excludes"
        />
        <div className={"container-fluid"} style={{backgroundColor: 'white'}}>
          <div className="row">
            <TablePresenter
              classnames={'col-lg'}
              model={'sampleTable'}
              lang={this.props.reduxlang}
              reduxID="sampleProfiles"
              excludefilters={['sampleInteger','test']}
            />
            <FramePresenter
              classnames={'col-md'}
              model={'sampleCard'}
              route="testcalls"
              language={this.props.reduxlang}
              clickHandlerOther={e => {
                console.log('some action');
              }}
              reduxID="developerPage"
            />
            <ListPresenter
              classnames={'col-sm'}
              model={'sampleList'}
              lang={this.props.reduxlang}
              include={['name','country']}
              reduxID="sampleProfiles"
            />
          </div>
        </div>
        Chart color styles:
        <div style={{width: '100vw', height: 'auto', overflow: 'scroll'}}>
          {colorStyles.map((colstyle) => {
            return (
              <div style={{width: '100%', height: '1em', display: 'flex', flexDirection: 'row', alignItems: 'stretch'}}>
              {colstyle + ':'}
                {colorsIndex[colstyle].map((col) => {
                  return (
                    <div style={ Object.assign({ colorBarStyles }, { backgroundColor: col, fontSize: '0.7rem' })}>
                      {col}
                    </div>
                    )
                  })
                }
              </div>
              )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // state refers to global redux state
  return {
    sampleProfiles: state.res_responseStates && state.res_responseStates.sampleProfiles && state.res_responseStates.sampleProfiles,
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath,
    requestState: state.req_requestStates && state.req_requestStates["developerPage-excludes"]
  };
}

export default connect(mapStateToProps)(App);
