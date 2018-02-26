import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { } from '../actions'
import BattleCharacter from './BattleCharacter'

class Battle extends React.Component {
  state = {
    rolls: [],
    locked: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false},
    combatants: {
      pc: [],
      npc: [],
      all: []
    }
  }

  componentDidMount = () => {
    this.setState({
      combatants: {
        pc: [{color: "red", armorColor: "red", health: 20, role: "Knight", equipment: [], mana: 0, name: ""}],
        npc: [],
        all: []
      }
    })
  }

  //"battlers" array - alternates between both teams
  //display all characters w/ hearts
  pcAlive = () => {
    return !!this.state.combatants.pc.find(char => {
      char.health <= 0
    })
  }

  npcAlive = () => {
    return false
  }

  //TAKE TURNS
  takeTurns = () => {
    let i = 0
    while(this.pcAlive() && this.npcAlive()) {
      this.takeTurn(this.state.combatants.all[i])
      i++
      if (i === this.state.combatants.all.length) {
        i = 0
      }
    }
    this.resolveBattle()
  }
  // while pcAlive and npcAlive > 0 go to next in battler Array
  // call turn on the character if it's a pc or npcturn if it's an npc

  //TURN
  takeTurn = (combatant) => {

  }
  //highlight current one

  rollDice = (rolls = 6) => {
    let arr = []
    const faces = ["Sword", "Heart", "Mana"]

    for (let i=0; i < rolls; i++) {
      if (this.state.locked[i]) {
        arr.push(this.state.rolls[i])
      } else {
        arr.push(faces[Math.floor(Math.random() * 3)])
      }
    }

    return arr
  }

  setDiceRoll = () => {
    let rolls = this.rollDice(6)
    this.setState({ rolls })
  }

  displayDiceRoll = () => {
    return this.state.rolls.map((r,i) => <label>{r}<input type="checkbox" name={i} onChange={this.lockDie}/></label>)
  }

  lockDie = (e) => {
    let status = !this.state.locked[e.target.name]
    this.setState({
      locked: {
        ...this.state.locked,
        [e.target.name]: status
      }
    })
  }



  //deal damage/heal
  //check if character died, if they did remove from respective arrays
  //use energy
  //check if character died, if they did remove from respective arrays
  //pass turn

  //npc turn
  // all damage unless life is < 50% in which case heal 1-3 and rest damage
  // damage as appropriate
  // damage aims at knight then the lowest HP
  //pass turn

  //ALL CHARACTER ON ONE SIDE DEAD
  resolveBattle = () => {

  }
  //award gold 100 per npc
  //award new team member if pc won

  renderParty = () => {
    return this.props.party.members.map(m => {
      let role = this.props.party.characters.find(c => c.id === m.character_id)
      return <BattleCharacter role={role} />
    })
  }

  renderEnemies = () => {
    return this.props.gameLogic.enemyArr.map(e => {
      let role = this.props.party.characters.find(c => c.role === e)
      return <BattleCharacter role={role} />
    })
  }

  //should redirect if there is no enemy array
  render() {
    return (
      <div>
        {this.renderParty()}
        {this.renderEnemies()}
        <button onClick={this.setDiceRoll}>Roll</button>
        {this.displayDiceRoll()}
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
   return {
     party: {
       members: state.party.party.members,
       characters: state.party.characters
     },
     gameLogic: {
       enemyArr: state.gameLogic.enemyArr
     }
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Battle)
