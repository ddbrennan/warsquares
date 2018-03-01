import React from "react";
import { purchaseItem } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PartyAdapter from "../api/PartyAdapter"

class Equipment extends React.Component {

  checkOwnership = () => {
    console.log("props in check ownership: ", this.props)
    return !!this.props.owned.find(e => {
      return e.equipment_id === this.props.equipment.id
    })
  }

  purchaseItem = () => {
    if (!this.checkOwnership() && this.props.gold > this.props.equipment.cost ) {
      PartyAdapter.updateParty(this.props.partyId, {item: this.props.equipment, gold: this.props.gold - this.props.equipment.cost})
        .then(res => this.props.purchaseItem(res.gold, res.party_equipments))
    }
  }

  render() {
    return (
      <div onClick={this.purchaseItem}>
        <h2>{this.props.equipment.name}</h2>
        <h3>{this.checkOwnership() ? "IN INVENTORY" : this.props.equipment.cost}</h3>
        <p>{this.props.equipment.bonus}</p>
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
   return {
     gold: state.party.gold,
     owned: state.party.party.inventory,
     partyId: state.party.party.id
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     purchaseItem: purchaseItem
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Equipment)
