import React from "react";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridMap from './GridMap'
import Encounter from './Encounter'
import Character from './Character'
import { stopQuesting } from '../actions'

class Battlefield extends React.Component {

  componentWillUnmount = () => {
    this.props.stopQuesting()
  }

  render() {
    return (
      <div>
        { this.props.questing ?
          <div>
            <div>Battlefield</div>
            <Link to="/party">Party</Link>

            <h2>{this.props.map.info.moves}</h2>
          { this.props.encounter && <Encounter />}
          <GridMap map={this.props.map} />
          </div>
        :
          <Redirect to="/party" />
        }
      </div>
    )
  }
 }


 const mapStateToProps = (state) => {
   console.log("encounter: ", state.gameLogic.encounter)
   let character = {}
   if (state.party.party.members) {
     character = {
       ...state.party.party.members[0],
       armorColor: state.party.party.members[0].armor_color,
       role: state.party.characters.find(c => c.id === state.party.party.members[0].character_id).role
     }
   }

   let map ={}

   if (state.party.maps.length) {
     map = state.party.maps.find(m => m.map.id === state.gameLogic.currentMap)
   }

   return {
     auth: {
       isLoggedIn: state.auth.isLoggedIn,
       user: state.auth.user
     },
     map: map,
     encounter: state.gameLogic.encounter,
     character: character,
     questing: state.gameLogic.questing
   }
 }

export default connect(mapStateToProps, { stopQuesting })(Battlefield)
