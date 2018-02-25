import React from "react"
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PartyAdapter from "../api/PartyAdapter"
import { importParty } from '../actions'
import Character from './Character'



class Party extends React.Component {

  componentDidMount = () => {
    PartyAdapter.getUserParty(this.props.auth.user)
      .then(this.props.importParty)
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

  mapMembers = () => {
    if (this.props.party.members) {
      return this.props.party.members.map(m => <Character key={m.id} character={m} />)
    }
  }



  render() {
    return (
      <div>
        {this.props.auth.isLoggedIn ?
          <div>

            <Link to="/battlefield">Battle</Link>
            <Link to="/store">Store</Link>

            <h1>{this.props.party.name && this.props.party.name.toUpperCase()}</h1>
            {this.mapMembers()}
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
     },
     party: {
       name: state.party.party.name,
       members: state.party.party.members,
       equipment: state.party.party.equipment
     }
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     importParty: importParty
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Party)
