import React, { Component } from 'react';
import HelmetPresenter from './components/HelmetPresenter';
import lang from './lang/index'
import { connect } from "react-redux";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div style={{width: '100vw',height: '100vh', backgroundColor: 'rgba(250, 250, 250, 0.9)'}}>
        <HelmetPresenter 
          reduxlang={this.props.reduxlang} 
          target={'page_not_found'}>
        </HelmetPresenter>
        <div className="alert alert-danger" role="alert">
          {lang.error_404_message[this.props.reduxlang]}
        </div>
        <div className="container h-50 d-flex justify-content-center">
          <div className="my-auto">
            <h2 className="display-2 text-center">404 </h2>
            <br></br>
            <h5 className="text-center">{lang.error_404_title[this.props.reduxlang]} </h5>
            <br></br>
            <p className="text-center">{lang.error_404_body_test[this.props.reduxlang]} </p>
          </div>
        </div>
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

export default connect(mapStateToProps)(Error);
