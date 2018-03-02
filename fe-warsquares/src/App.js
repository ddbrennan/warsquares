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
          <Route exact path='/battle' component={Battle} />
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

  // render() {
  //   const AuthLoginForm = authorize(LoginForm);
  //   const AuthProfile = authorize(Profile);
  //   console.log(this.props);
  //   return (
  //     <div className="App">
  //       <Navigation />
  //       <Switch>
  //         ...
  //         <Route exact path="/profile" component={AuthProfile} />
  //         <Route
  //           exact
  //           path="/login"
  //           render={props => <AuthLoginForm onSubmit={this.logIn} {...props} />}
  //         />
  //         <Redirect to="/" />
  //       </Switch>
  //       ...
  //     </div>
  //   );
  // }

//   import React from "react";
// import { Redirect } from "react-router-dom";
// const authorize = RenderedComponent => {
//   return class extends React.Component {
//     render() {
//       console.log(this.props);
//       if (
//         localStorage.getItem("jwt") &&
//         this.props.location.pathname === "/login"
//       ) {
//         return <Redirect to="/" />;
//       } else if (
//         !localStorage.getItem("jwt") &&
//         this.props.location.pathname !== "/login"
//       ) {
//         return <Redirect to="/login" />;
//       } else {
//         return <RenderedComponent />;
//       }
//     }
//   };
// };
// export default authorize;
