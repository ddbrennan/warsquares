import React from "react";
import { connect } from 'react-redux'

class Encounter extends React.Component {

  //should calc bribe money
  calculateBribe = () => {
    return 100
  }

  bribe = () => {
    console.log("bribing")
    //check if you have enough gold, if yes then resolve the encounter
  }

  fight = () => {
    console.log("fighting")
    //enter fight logic

  }

  calculateEnemies = () => {
    let terrain = this.props.enemies[0]
    let num = this.props.enemies[1]
    let enemyArr = []
    switch(terrain) {
      case 'M':
        enemyArr.push('Cleric')
        break;
      case 'F':
        enemyArr.push('Knight')
        break;
      case 'S':
        enemyArr.push('Mage')
        break;
      case 'W':
        enemyArr.push('Rogue')
        break;
    }
    //add more enemies to array based on length
    return enemyArr
  }

  resolve = () => {
    //changes status back to over, adds member to team
  }

  //should only trigger if enemies is > 0
  render() {
    return (
      <div>
        <h2>ENCOUNTER!</h2>
        <p>It's {this.calculateEnemies().join(", ")}!</p>
        <ul>
          <li onClick={this.bribe}>Bribe for {this.calculateBribe()}</li>
          <li onClick={this.fight}>Fight them!</li>
          { this.props.tabard && <li>Recruit</li>}
        </ul>
      </div>
    )
  }
 }

const mapStateToProps = (state) => {
  return {
    enemies: state.gameLogic.enemies,
    tabard: state.gameLogic.hasTabard
  }
}

export default connect(mapStateToProps)(Encounter)
