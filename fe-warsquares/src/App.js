import React, { Component } from 'react';
import AuthAdapter from './api/AuthAdapter'
import { Switch, Route, Redirect } from 'react-router-dom'
import Party from './Party.js'
import Login from './Login.js'
import { connect } from 'react-redux';


class App extends Component {

  componentWillMount() {
    if (localStorage.getItem('jwt')) {
      AuthAdapter.current_user()
        .then(user => {
          if (!user.error) {
            console.log("fetch user")
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => {
              return this.props.auth.isLoggedIn ? <Party /> : <Redirect to="/login" />
          }} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: {
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user
    }
  }
}

export default connect(mapStateToProps)(App);
