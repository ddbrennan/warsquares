import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setEnemies, resolveEncounter } from '../actions'
import { Link } from 'react-router-dom'
import Battle from './Battle'
import {NAME_ARRAY} from '../resources/names.js'
import {ARMOR_COLORS} from '../resources/armorcolors.js'
import {SKIN_TONES} from '../resources/skintones.js'
import PartyAdapter from "../api/PartyAdapter"



class Encounter extends React.Component {
  state = {
    enemyArr: []
  }

  //should calc bribe money
  calculateBribe = () => {
      let bribe = 200 * (this.props.square[0] + this.props.square[1]) * this.props.enemyArr.length
      return bribe
  }

  bribe = () => {
    console.log("attempting bribe")
    console.log(this.calculateBribe(), this.props.gold)
    if (this.props.gold >= this.calculateBribe()) {
      console.log("resolving encounter")
        this.resolveEncounter()
    }
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

  resolveEncounter = () => {
    let goldPaid = this.calculateBribe()
    let moveCount = this.props.map.info.moves + 1
    let complete = false

    let recruit = this.props.enemyArr[0]
    let currentSquare = this.props.square.join("")

    let visId = [this.props.square[0] + this.props.square[1]*Math.sqrt(this.props.map.info.visited.length)]
    let newVis = this.props.map.info.visited.split("")
    newVis[visId] = 1
    let visited = newVis.join("")

    if (this.props.map.map.layout.match(/.{2}/g)[visId][0] === "C") {
      complete = true
    }

    PartyAdapter.updateParty(this.props.partyId, {
      recruit: recruit,
      gold: this.props.gold - goldPaid,
      map: {
        current_square: currentSquare,
        visited: visited,
        moves: moveCount,
        complete: complete,
        id: this.props.map.info.id
      }
    })
       .then(this.props.resolveEncounter)
  }

  isntCastle = () => {
    let visId = [this.props.selectedSquare[0] + this.props.selectedSquare[1]*Math.sqrt(this.props.map.info.visited.length)]
    let notCastle = this.props.map.map.layout.match(/.{2}/g)[visId][0] !== "C"
    return notCastle
  }

  render() {
    return (
      <div>
        <h2>ENCOUNTER!</h2>
        {this.props.enemyArr.length ? <p>It's a {this.props.enemyArr[0].role}{!!(this.props.enemyArr.length - 1) ? ` and ${this.props.enemyArr.length - 1} allies` : null}!</p> : null}
          {this.isntCastle ? <p onClick={this.bribe}>Bribe for {this.calculateBribe()}</p> : null }
          <Link to="/battle">Battle Them!</Link>
          {this.props.tabard ? <p>Attempt to Recruit</p>: null}
      </div>
    )
  }
 }

const mapStateToProps = (state) => {
  let map = []
  if (state.party.maps.length) {
    map = state.party.maps.find(m => m.map.id === state.gameLogic.currentMap)
  }

  return {
    enemies: state.gameLogic.enemies,
    tabard: state.gameLogic.hasTabard,
    enemyArr: state.gameLogic.enemyArr,
    characters: state.party.characters,
    square: state.gameLogic.selectedSquare,
    gold: state.party.gold,
    map: map,
    partyId: state.party.party.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEnemies: setEnemies,
    resolveEncounter: resolveEncounter
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter)
