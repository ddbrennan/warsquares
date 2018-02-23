import React from "react";
import UserAdapter from "../api/UserAdapter"

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: ""
  }

  //should login after submit

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    UserAdapter.createUser(this.state)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  render() {
    return (
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
    )
  }
 }
export default SignUp
