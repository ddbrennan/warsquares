import React, { Component } from 'react';
import AuthAdapter from './api/AuthAdapter'
import { Switch, Route, Redirect } from 'react-router-dom'
import Party from './Party.js'
import Login from './Login.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { logIn } from './actions'


class App extends Component {

  componentWillMount() {
    console.log("willmount: ", this.props.auth)
    if (localStorage.getItem('jwt')) {
      AuthAdapter.current_user()
        .then(user => {
          if (!user.error) {
            console.log("Fetching User...", this.props)
            this.props.logIn(user)
          }
        })
    }
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/battlefield' component={Party} />
          <Route exact path='/store' component={Party} />
          <Route exact path='/login' component={Party} />
          <Route exact path='/party' component={Party} />
          <Route exact path='/' component={Login} />
          <Route path="*" component={FourOhFour}
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log("map state: ", state)
  return {
    auth: {
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logIn: logIn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
