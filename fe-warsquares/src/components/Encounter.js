import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setEnemies } from '../actions'
import { Link } from 'react-router-dom'
import Battle from './Battle'
import {NAME_ARRAY} from '../resources/names.js'
import {ARMOR_COLORS} from '../resources/armorcolors.js'
import {SKIN_TONES} from '../resources/skintones.js'


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

  makeEnemy = (role, id) => {
    let name = NAME_ARRAY[Math.floor(Math.random() * NAME_ARRAY.length)]
    let armorColor = ARMOR_COLORS[Math.floor(Math.random() * ARMOR_COLORS.length)]
    let color = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)]
    let health = this.props.characters.find(c => c.role === role).health
    return {
      id: id,
      name: name,
      armor_color: armorColor,
      color: color,
      health:health,
      max_health: health,
      mana:0,
      party_id:0,
      role: role
    }
  }

  calculateEnemies = () => {
    let terrain = this.props.enemies[0]
    let num = this.props.enemies[1]
    let enemyArr = []
    switch(terrain) {
      case 'M':
        enemyArr.push(this.makeEnemy('Cleric', 1))
        break;
      case 'F':
        enemyArr.push(this.makeEnemy('Knight', 1))
        break;
      case 'S':
        enemyArr.push(this.makeEnemy('Mage', 1))
        break;
      case 'W':
        enemyArr.push(this.makeEnemy('Rogue', 1))
        break;
    }

    const enemyTypes = ['Cleric', 'Knight', 'Mage', 'Rogue']

    for (let i=0; i<(num-1); i++) {
      enemyArr.push(this.makeEnemy(enemyTypes[Math.floor(Math.random() * 4)], i + 2))
    }

    this.props.setEnemies(enemyArr)
  }

  //should only trigger if enemies is > 0
  render() {
    return (
      <div>
        <h2>ENCOUNTER!</h2>
        {this.props.enemyArr.length ? <p>It's a {this.props.enemyArr[0].role} and {this.props.enemyArr.length - 1} allies!</p> : null}
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
    enemyArr: state.gameLogic.enemyArr,
    characters: state.party.characters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEnemies: setEnemies
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter)
