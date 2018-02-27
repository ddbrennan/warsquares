import React from "react";
import Character from "./Character"

class BattleCharacter extends React.Component {

  render() {
    return (
      <div>
        <Character character={this.props.character} />
        <div>{this.props.character.mana}</div>
        <div>{this.props.character.health}</div>
      </div>
    )
  }
}

export default BattleCharacter
