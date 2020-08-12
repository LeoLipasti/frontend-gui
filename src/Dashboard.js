import React, { Component } from 'react';
import HelmetPresenter from './components/HelmetPresenter';
import NavPresenter from './components/NavPresenter';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div>
        <HelmetPresenter 
          reduxlang={this.props.reduxlang} 
          target={'dashboard'}>
        </HelmetPresenter>
        <NavPresenter
          model={'navigationMain'}
          reduxID="Dashboard"
          route="testcalls"
          language={this.props.reduxlang}
          closed={false}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  // state refers to global redux state
  return {
    reduxlang: state['appPath'] && state['appPath']['appPath'] && state['appPath']['appPath']
  };
}

export default connect(mapStateToProps)(Dashboard);
