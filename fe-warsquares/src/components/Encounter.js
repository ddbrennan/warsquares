import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setEnemies } from '../actions'
import { Link } from 'react-router-dom'
import Battle from './Battle'


class Encounter extends React.Component {
  state = {
    enemyArr: []
  }

  //should calc bribe money
  calculateBribe = () => {
    // some number times coordinates of the square times number of enemies
    return 100
  }

  bribe = () => {
    console.log("bribing")
    //check if you have enough gold, if yes then resolve the encounter
  }

  componentWillMount = () => {
    this.calculateEnemies()
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

    const enemyTypes = ['Cleric', 'Knight', 'Mage', 'Rogue']

    for (let i=0; i<(num-1); i++) {
      enemyArr.push(enemyTypes[Math.floor(Math.random() * 4)])
    }

    this.props.setEnemies(enemyArr)
  }

  //should only trigger if enemies is > 0
  render() {
    return (
      <div>
        <h2>ENCOUNTER!</h2>
        <p>It's {this.props.enemyArr.join(", ")}!</p>
        <ul>
          <li onClick={this.bribe}>Bribe for {this.calculateBribe()}</li>
          <Link to="/battle">Battle Them!</Link>
          { this.props.tabard && <li>Recruit</li>}
        </ul>
      </div>
    )
  }
 }

const mapStateToProps = (state) => {
  return {
    enemies: state.gameLogic.enemies,
    tabard: state.gameLogic.hasTabard,
    enemyArr: state.gameLogic.enemyArr
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEnemies: setEnemies
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter)
