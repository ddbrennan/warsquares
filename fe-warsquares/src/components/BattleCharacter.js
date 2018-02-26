import React from "react";

class BattleCharacter extends React.Component {

  //import all svgs, display the appropriate one with health info, mana info
  render() {
    return (
      <div>{this.props.role.role}</div>
    )
  }
}

export default BattleCharacter
