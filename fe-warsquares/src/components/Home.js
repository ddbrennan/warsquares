import React from "react";
import { Link } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'

class Home extends React.Component {
  state = {
    status: ""
  }

  render() {
    return (
      <div id="title-screen">
        <div id="title-graphic"></div>
        <div id="auth-buttons">
          <div className="auth-button" onClick={() => this.setState({ status: "signing in"})}>Sign In</div>
          {this.state.status === "signing in" ? <Login /> : null}
          <div className="auth-button" onClick={() => this.setState({ status: "signing up"})}>Sign Up</div>
          {this.state.status === "signing up" ? <SignUp /> : null}
        </div>
      </div>
    )
  }
 }


export default Home
