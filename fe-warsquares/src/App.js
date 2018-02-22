import React, { Component } from 'react';
import AuthAdapter from './api/AuthAdapter'
import { Switch, Route, Redirect } from 'react-router-dom'
import Party from './components/Party.js'
import Login from './components/Login.js'
import Store from './components/Store.js'
import Home from './components/Home.js'
import SignUp from './components/SignUp.js'
import Battlefield from './components/Battlefield.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn, logOut } from './actions'
import { withRouter } from "react-router-dom"
import { Link } from 'react-router-dom'




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
    return (
      <div className="App">
        {this.props.auth.isLoggedIn ? <button onClick={this.logout}>Logout</button> : null }
        <Link to="/home">Home</Link>
        <Switch>
          <Route exact path='/battlefield' component={Battlefield} />
          <Route exact path='/store' component={Store} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/party' component={Party} />
          <Route path="*" component={Home} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: {
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logIn: logIn,
    logOut: logOut
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
