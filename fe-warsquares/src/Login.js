import React from "react";
import AuthAdapter from './api/AuthAdapter'


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
          this.setState({
            auth: { isLoggedIn: true, user: user}
          })
          localStorage.setItem('jwt', user.jwt)
        }
      })
  }

  logout() {
    localStorage.removeItem('jwt')
    this.setState({ auth: { isLoggedIn: false, user:{}}})
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
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
    )
  }
 }
export default Login
