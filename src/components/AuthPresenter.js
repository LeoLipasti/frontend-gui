import React, { Component } from 'react';
import Auth from './presenter_elements/Auth';
import { connect } from "react-redux";
import { staticModels } from '../proxy/staticModels';

// (*)Presenters -> Card/Frame/List/Table

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {String} model
 * @param {Array} attributes
 * @param {String} language
 * @param {Boolean} closed
 * @param {Function} clickHandlerOther
 * @param {Function} credentials
 * @param {Function} submit
 * @param {String} callState
 * 
 */
class AuthPresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.modelStates && !this.props.modelStates[this.props.model + '-' + this.props.reduxID]) {
      // if no model yet request one ( model string, include array, exclude array, model + reduxID string )
      staticModels(this.props.model, this.props.include, this.props.exclude, this.props.model + '-' + this.props.reduxID);
    }
  }

  render() {
    return (
      (!this.props.closed && !!this.props.modelStates && !this.props.modelStates[this.props.model +  '-' + this.props.reduxID] && (
      <div className={this.props.classnames ? this.props.classnames : ''} style={this.props.inlinestyle}>
        <Auth
          clickHandlerSubmit={e => {
            this.props.submit();
          }}
          clickHandlerOther={this.props.clickHandlerOther}
          inputHandlerFocus={e => {
            // focus if it is needed
          }}
          inputHandlerChange={e => {
            this.props.credentials(e);
          }}
          contentArray={this.props.modelStates[this.props.model +  '-' + this.props.reduxID]}
          attributes={this.props.dataStates}
          lang={this.props.language}
          callState={this.props.callState}
        />
      </div>
      ))
    )
  }
}

function mapStateToProps(state, ownProps) {
  // state refers to global redux state
  return {
    modelStates: !!state['modelStates'] && state['modelStates'],
    dataStates: state.res_responseStates && state.res_responseStates[ownProps.reduxID] && state.res_responseStates[ownProps.reduxID],
  };
}

export default connect(mapStateToProps)(AuthPresenter);

