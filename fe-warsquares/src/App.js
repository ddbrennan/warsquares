import React, { Component } from 'react';
import AuthAdapter from './api/AuthAdapter'
import { Switch, Route } from 'react-router-dom'
import Party from './components/Party.js'
import Login from './components/Login.js'
import Store from './components/Store.js'
import Home from './components/Home.js'
import Battle from './components/Battle.js'
import SignUp from './components/SignUp.js'
import Battlefield from './components/Battlefield.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn, logOut } from './actions'
import { withRouter } from "react-router-dom"
import { Link } from 'react-router-dom'
import authorize from './components/hoc/authorize'




class App extends Component {

  componentWillMount() {
    if (localStorage.getItem('jwt')) {
      AuthAdapter.current_user()
        .then(user => {
          if (!user.error) {
            this.props.logIn(user)
          }
        })
    }
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.logOut()
  }

  render() {
    const AuthBattlefield = authorize(Battlefield);
    const AuthStore = authorize(Store);
    const AuthParty = authorize(Party);
    const AuthBattle = authorize(Battle);
    const AuthHome = authorize(Home);
    const AuthSignUp = authorize(SignUp);
    const AuthLogin = authorize(Login);

    return (
      <div className="App">
        <Switch>
          <Route exact path='/battlefield' component={AuthBattlefield} />
          <Route exact path='/store' component={AuthStore} />
          <Route exact path='/login' component={AuthLogin} />
          <Route exact path='/signup' component={AuthSignUp} />
          <Route exact path='/party' component={AuthParty} />
          <Route exact path='/battle' component={AuthBattle} />
          <Route path="*" component={AuthHome} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logIn: logIn,
    logOut: logOut
  }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(App));
