import React from 'react'
import Knight from './images/Knight'
import Cleric from './images/Cleric'
import Rogue from './images/Rogue'
import Mage from './images/Mage.js'

class Character extends React.Component {

  pickSvg = () => {
    switch(this.props.character.role) {
      case "Knight":
        return <Knight color={this.props.character.color} armorColor={this.props.character.armor_color} />
      case "Cleric":
        return <Cleric color={this.props.character.color} armorColor={this.props.character.armor_color} />
      case "Rogue":
        return <Rogue color={this.props.character.color} armorColor={this.props.character.armor_color} />
      case "Mage":
        return <Mage color={this.props.character.color} armorColor={this.props.character.armor_color} />
    }
  }

  render() {
    console.log("Character: ", this.props.character)
    return(
      <div>
        {this.pickSvg()}
        <h3>{this.props.character.name}</h3>
      </div>
    )
  }
}

export default Character
