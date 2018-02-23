import React from "react"
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PartyAdapter from "../api/PartyAdapter"



class Party extends React.Component {

  componentDidMount = () => {
    PartyAdapter.getUserParty(this.props.auth.user)
      .then(console.log)
  }

  // fetch the party
  //  if there isn't one, create character
  //  delete part button?
  // should know members, equipment, gold and current map

  //create character
  // pick a class
  // choose colors

  //party members
  // name
  // class, colors
  // stats
  // equipment

  // inventory
  //  all items you own that aren't equipped
  // gold



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
