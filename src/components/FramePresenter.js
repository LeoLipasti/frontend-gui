import React, { Component } from 'react';
import Frame from './presenter_elements/Frame';
import { req_formSubmits } from '../redux/actions/requests/formSubmits';
import { req_requestStates } from '../redux/actions/requests/requestStates';
import store from '../redux/store/store';
import { connect } from "react-redux";
import { staticModels } from '../proxy/staticModels';

// (*)Presenters -> Card/Frame/List/Table

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {String} model
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} route
 * @param {String} language
 * @param {Function} clickHandlerOther
 * @param {String} callState
 *  
 */
class FramePresenter extends React.Component {
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
      (!!this.props.modelStates && !!this.props.modelStates[this.props.model + '-' + this.props.reduxID] && (
        <div className={this.props.classnames ? 'overflow-auto '+this.props.classnames : 'overflow-auto'} style={this.inlinestyle}>
          <Frame
            clickHandlerClose={() => {
              store.dispatch(req_requestStates(this.props.reduxID, {module_closed: true}))
            }}
            clickHandlerSubmit={e => {
              store.dispatch(req_formSubmits(this.props.reduxID,this.props.route))
            }}
            clickHandlerOther={this.props.clickHandlerOther}
            inputHandlerFocus={e => {
              // focus if it is needed
            }}
            inputHandlerChange = {e => {
              store.dispatch(req_requestStates(e,this.props.reduxID))
            }}
            contentArray={this.props.modelStates[this.props.model + '-' + this.props.reduxID]}
            attributes={this.props.dataStates}
            reduxID={this.props.reduxID}
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

export default connect(mapStateToProps)(FramePresenter);
