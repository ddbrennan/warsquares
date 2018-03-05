import React from "react";
import UserAdapter from "../api/UserAdapter"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn, logOut } from '../actions'
import { Redirect } from 'react-router'
import AuthAdapter from '../api/AuthAdapter'
import { withRouter } from "react-router-dom"




class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: ""
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    UserAdapter.createUser(this.state)
      .then(res => res.json())
      .then(user => {
        if (!user.error) {
          localStorage.setItem('jwt', user.jwt)
          this.props.logIn(user)
        }
      })
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ?
          <Redirect to="/party"></Redirect>
          :
          <div>
            <h1>Sign Up Page</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleFormChange}></input>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleFormChange}></input>
              { (this.state.password !== this.state.passwordConfirm && this.state.passwordConfirm.length > 0)
                ? <h3>Passwords Must Match</h3> : null}
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                value={this.state.passwordConfirm}
                onChange={this.handleFormChange}></input>
              <input type="submit" value="Sign Up!"></input>
            </form>
          </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
