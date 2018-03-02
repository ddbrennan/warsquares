import React from "react";
import Character from "./Character"

class BattleCharacter extends React.Component {

  render() {
    return (
      <div>
        <Character character={this.props.character} />
        <h3>{this.props.character.name}</h3>
        <div>{this.props.character.mana}</div>
        <div>{this.props.character.health}</div>
      </div>
    )
  }
}

export default BattleCharacter
