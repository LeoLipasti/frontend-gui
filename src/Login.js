import React, { Component } from 'react';
import HelmetPresenter from './components/HelmetPresenter';
import AuthPresenter from './components/AuthPresenter';
import { connect } from "react-redux";

import jsonFetch from './fetch/jsonFetch';

import { sessionReset } from './storage/sessionStorage';

import lang from './lang/index'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { step: null, password: null, username: null, callState: 'waiting' };
  }
  componentDidMount() {
    sessionReset();
  }
  render() {
    return (
      <div>
        <HelmetPresenter
          reduxlang={this.props.reduxlang} 
          target={'login'}
          bg={true}
          >
        </HelmetPresenter>
        <AuthPresenter
          attributes={null}
          model={'sampleAuth'}
          language={this.props.reduxlang}
          closed={false}
          clickHandlerOther={e => {
            console.log('register placeholder');
          }}
          credentials={e => {
            this.setState(e);
          }}
          submit={e => {
            // replace tokens test path by public api path and use this instead:
            //jsonFetch( '/testcalls', { method: 'POST' }, false, undefined, 0, [], { username: this.state.username, password: this.state.password }
            this.setState({ callState: 'calling' });
            jsonFetch( '/tokens/0', { method: 'GET' }, false, undefined, 0, [], undefined )
            .then(() => {
              window.location.replace('/'+lang.route_dashboard[this.props.reduxlang]);
            })
            .catch((err) => {
              this.setState({ callState: 'servererror' });
            })
          }}
          callState={this.state.callState}
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

export default connect(mapStateToProps)(Login);
