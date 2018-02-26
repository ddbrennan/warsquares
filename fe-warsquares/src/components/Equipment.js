import React from "react";
import { purchaseItem } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Equipment extends React.Component {

  checkOwnership = () => {
    return !!this.props.owned.find(e => {
      return e.id === this.props.equipment.id
    })
  }

  purchaseItem = () => {
    if (!this.checkOwnership() && this.props.gold > this.props.equipment.amount ) {
      this.props.purchaseItem(this.props.equipment)
    }
    //if all ok then add to inventory
    //if tabard then update that
  }

  render() {
    return (
      <div onClick={this.purchaseItem}>
        <h2>{this.props.equipment.name}</h2>
        <h3>{this.checkOwnership() ? "IN INVENTORY" : this.props.equipment.amount}</h3>
        <p>{this.props.equipment.bonus}</p>
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
   return {
     gold: state.party.gold,
     owned: state.party.party.equipment
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     purchaseItem: purchaseItem
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Equipment)