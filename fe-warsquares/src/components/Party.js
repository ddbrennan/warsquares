import React from "react"
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Party extends React.Component {

  render() {
    return (
      <div>
        {this.props.auth.isLoggedIn ?
          <div>

            <Link to="/battlefield">Battle</Link>
            <Link to="/store">Store</Link>

            <div>
              <h3>Character 1</h3>
              <p>Stats</p>
              <div>Item</div>
            </div>

            <div>
              <h3>Character 2</h3>
              <p>Stats</p>
              <div>Item</div>
            </div>

            <div>
              <h3>Character 3</h3>
              <p>Stats</p>
              <div>Item</div>
            </div>

            <div>
              <h3>Character 4</h3>
              <p>Stats</p>
              <div>Item</div>
            </div>
          </div>
        :
          <Redirect to="/home"/>
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

export default connect(mapStateToProps)(Party)
