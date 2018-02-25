import React from "react";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridMap from './GridMap'
import Encounter from './Encounter'

class Battlefield extends React.Component {

  // randomly generate a map if there isn't one or if it's been completed
  //  string [TYPE][NUMBER OF ENEMIES][VISITED] eg: M91F20
  //  first square is always F01
  // or load old one

  //battle
  //  roll 6 dice per character, freeze some
  // heart - heal
  // sword - deal 1 damage
  // bolt - gain 1 energy
  // after roll use ability -
  //  cleric - send 1 heart to another party member
  //  warrior - turn an energy into damage
  //  rogue - roll again
  //  mage - deal damage by energy


  // Display Player Character Large Element
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
     },
     map: state.party.map,
     encounter: state.gameLogic.encounter
   }
 }

export default connect(mapStateToProps)(Battlefield)
