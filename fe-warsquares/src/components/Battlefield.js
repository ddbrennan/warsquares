import React from "react";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridMap from './GridMap'
import Encounter from './Encounter'
import Character from './Character'

class Battlefield extends React.Component {

  render() {
    return (
      <div>
        { this.props.auth.isLoggedIn ?
          <div>
            <div>Battlefield</div>
            <Link to="/party">Party</Link>
            <Link to="/store">Store</Link>


          { this.props.encounter && <Encounter />}
          <GridMap map={this.props.map} />
            <div className="corner-char-box">
              <div className="big-corner-char">
                <Character character={this.props.character} />
              </div>
            </div>
          </div>
        :
          <Redirect to="/home" />
        }
      </div>
    )
  }
 }


 const mapStateToProps = (state) => {
   let character = {}
   if (state.party.party.members) {
     character = {
       ...state.party.party.members[0],
       armorColor: state.party.party.members[0].armor_color,
       role: state.party.characters.find(c => c.id === state.party.party.members[0].character_id).role
     }
   }

   return {
     auth: {
       isLoggedIn: state.auth.isLoggedIn,
       user: state.auth.user
     },
     map: state.party.map,
     encounter: state.gameLogic.encounter,
     character: character
   }
 }

export default connect(mapStateToProps)(Battlefield)
