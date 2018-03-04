import React from "react";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

class Home extends React.Component {

  render() {

    return (
      <div>
          {this.props.auth.isLoggedIn ?
            <Redirect to="/party"></Redirect>
          :
            <div>
              <div>Home</div>
              <Link to="/login">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
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

export default connect(mapStateToProps)(Home)
