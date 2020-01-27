import React, { Component } from 'react';
import Card from './modules/Card';
import auth from './models/forms/sampleAuth';
import lang from './lang/index'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';
import {
  Link
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null };
  }
  render() {
    return (
      <div>
        <Helmet>
          <html lang={lang.lang[this.props.reduxlang]}/>
            <title>{lang.titles[this.props.reduxlang].login}</title>
          <meta name="description" content={lang.pages[this.props.reduxlang].login} />
        </Helmet>
        <div>
          <ul>
            <li>
              <Link to={"/"+lang.lang[this.props.reduxlang]}>
                {lang.route_home[this.props.reduxlang]}
              </Link>
            </li>
            <li>
              <Link to={"/"+lang.route_login[this.props.reduxlang]+"/"+lang.lang[this.props.reduxlang]}>
                {lang.route_login[this.props.reduxlang]}
              </Link>
            </li>
          </ul>
        </div>
        <Card
          clickHandlerClose={null}
          clickHandlerSubmit={e => {
            this.setState(e);
            console.log('submit');
          }}
          clickHandlerOther={e => {
            this.setState(e);
            console.log('other');
          }}
          inputHandlerFocus={e => {
            this.setState(e);
          }}
          inputHandlerChange = {e => {
            this.setState(e);
          }}
          contentArray={auth}
          attributes={null}
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
    reduxlang: state.appPath && state.appPath.appPath && state.appPath.appPath
  };
}

export default connect(mapStateToProps)(Login);
