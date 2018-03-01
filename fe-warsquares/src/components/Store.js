import React from "react";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Equipment from './Equipment'

class Store extends React.Component {

  displayEquipment = () => {

    return this.props.equipment.all.map(e => <Equipment
                                                key={e.id}
                                                equipment={e} />)
  }

  render() {
    return (
      <div>
        { this.props.auth.isLoggedIn ?
          <div>
            <div>Store</div>
            <Link to="/party">Party</Link>

            <h3>Available gold: {this.props.gold}</h3>
            { this.displayEquipment() }
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
     equipment: {
       owned: state.party.party.equipment,
       all: state.party.equipment
     },
     gold: state.party.gold
   }
 }

export default connect(mapStateToProps)(Store)
