import React from "react"
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PartyAdapter from "../api/PartyAdapter"
import { importParty, deleteParty } from '../actions'
import Character from './Character'
import MapDisplay from './MapDisplay'
import CreateCharacter from './CreateCharacter'



class Party extends React.Component {

  componentWillMount = () => {
    console.log("Attempting to fetch for: ", this.props.auth.user)
    if (this.props.auth.user) {
      PartyAdapter.getUserParty(this.props.auth.user.id)
        .then(this.props.importParty)
      }
  }

  //party members
  // name
  // class, colors
  // stats
  // equipment

  // INVENTORY

  //allow equipping

  //  all items you own that aren't equipped

  // gold



  mapMembers = () => {
    if (this.props.party.members) {
      return this.props.party.members.map(m => <div className="party-display-char"><Character key={m.id} character={m} /></div>)
    }
  }

  mapEquipment = () => {
    console.log("Equipment: ", this.props.party.equipment)
    if (this.props.party.equipment) {
      return this.props.party.equipment.map(e => {
        let equip = this.props.party.equipmentAll.find(item => item.id === e.equipment_id)
        return <div className="party-equipment-display">{equip.name}</div>
      })
    }
  }

  deleteParty = () => {
    PartyAdapter.deleteParty(this.props.party.id)
      .then(this.props.deleteParty)
  }



  render() {
    return (
      <div>
        {this.props.auth.isLoggedIn ?
          <div>

            { this.props.party.name ?
              <div>
                <Link to="/store">Store</Link>

                <h1>{this.props.party.name && this.props.party.name.toUpperCase()}</h1>

                  <MapDisplay />

                <div className="party-members">{this.mapMembers()}</div>
                <div className="inventory">{this.mapEquipment()}</div>
                <p>{this.props.gold}</p>
                <button onClick={this.deleteParty}>Delete Party</button>
              </div>
              :
              <CreateCharacter />
            }
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
       equipment: state.party.party.inventory,
       equipmentAll: state.party.equipment,
       id: state.party.party.id,
       gold: state.party.party.gold
     }

   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     importParty: importParty,
     deleteParty: deleteParty
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Party)
