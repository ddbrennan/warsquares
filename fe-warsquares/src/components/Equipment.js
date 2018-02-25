import React from "react";

class Equipment extends React.Component {

  purchaseItem = () => {
    console.log("Purchasing...")
    //check if owned
    //check if you have enough gold
    //if all ok then add to inventory
  }

  render() {
    return (
      <div onClick={this.purchaseItem}>
        <h2>{this.props.equipment.name}</h2>
        <h3>{this.props.owned ? "IN INVENTORY" : this.props.equipment.amount}</h3>
        <p>{this.props.equipment.bonus}</p>
      </div>
    )
  }
 }
export default Equipment
