import React from "react";
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Store extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        { this.props.auth.isLoggedIn ?
          <div>
            <div>Store</div>
            <Link to="/party">Party</Link>
            <Link to="/battlefield">Battlefield</Link>
          </div>
        :
          <Redirect to="/home" />
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

export default connect(mapStateToProps)(Store)
