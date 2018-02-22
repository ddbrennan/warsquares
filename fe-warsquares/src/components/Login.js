import React from "react";
import AuthAdapter from '../api/AuthAdapter'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn, logOut } from '../actions'
import { Link } from 'react-router-dom'


class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  logIn = (e) => {
    e.preventDefault()
    AuthAdapter.login({
      username: this.state.username,
      password: this.state.password
    })
      .then(user => {
        if (!user.error) {
          this.props.logIn(this.state)
          localStorage.setItem('jwt', user.jwt)
        }
      })
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div>
        {!this.props.auth.isLoggedIn ?
          <div>
            <Link to="/signup">Sign Up</Link>

            <form onSubmit={ this.logIn }>
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleFormChange}
                name="username">
              </input>
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleFormChange}
                name="password"></input>
              <input type="submit" value="Log in"></input>
            </form>
          </div>
        :
          <Redirect to="/party"/>
        }
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
