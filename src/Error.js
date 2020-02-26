import React, { Component } from 'react';
import lang from './lang/index'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
            <title>{lang.titles[this.props.reduxlang].page_not_found}</title>
          <meta name="description" content={lang.pages[this.props.reduxlang].page_not_found} />
        </Helmet>
        {lang.error_page_not_found[this.props.reduxlang]}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // state refers to global redux state
  return {
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath
  };
}

export default connect(mapStateToProps)(Error);
