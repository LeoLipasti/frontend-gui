import React, { Component } from 'react';
import CardPresenter from './components/CardPresenter';
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
        <CardPresenter
          attributes={null}
          model={auth}
          reduxID="Login"
          route="testcalls"
          language={this.props.reduxlang}
          closed={false}
          clickHandlerOther={e => {
            console.log('register placeholder');
          }}
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
