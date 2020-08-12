import React, { Component } from 'react';
import List from './presenter_elements/List';
import { connect } from "react-redux";
import { staticModels } from '../proxy/staticModels';

// (*)Presenters -> Card/Frame/List/Table

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {String} model
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} language
 * @param {Array} include
 * @param {Array} exclude
 * 
 */
class ListPresenter extends React.Component {
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
    <div className={this.props.classnames ? 'overflow-auto ' + this.props.classnames : 'overflow-auto'} style={this.props.inlinestyle}>
    <List
        contentArray={this.props.modelStates[this.props.model + '-' + this.props.reduxID]}
        attributes={
          !!this.props.dataStatesFiltered ? this.props.dataStatesFiltered : 
          (!!this.props.dataStates && this.props.dataStates)}
        reduxID={this.props.reduxID}
        lang={this.props.language}
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
    dataStatesFiltered: state.res_responseStates && state.res_responseStates[ownProps.reduxID + '-filter'] && state.res_responseStates[ownProps.reduxID + '-filter'],
  };
}

export default connect(mapStateToProps)(ListPresenter);


