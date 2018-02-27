import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { } from '../actions'
import BattleCharacter from './BattleCharacter'
import { earnGold, addPartyMember } from '../actions'

class Battle extends React.Component {
  state = {
    rolls: [],
    locked: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false},
    combatants: [],
    rolling: false,
    spellcasting: false,
    currentTurn: 0
  }

  getAllList = () => {
    const enemies = this.getNPCList()
    const allies = this.getPCList()
    let cap = Math.max(enemies.length, allies.length)
    let allList = []

    for (let i = 0; i < cap; i++) {
      if (allies[i]) {
        allList.push(allies[i])
      }
      if (enemies[i]) {
        allList.push(enemies[i])
      }
    }

    return allList
  }

  getPCList = () => {

    return this.props.party.members.map(m => {
      let role = this.props.party.characters.find(c => c.id === m.character_id)

      let charObj = {
        mana: 0,
        armorColor: m.armor_color,
        color: m.color,
        role: role.role,
        health: role.health,
        equipment: [], //should find equipment with holder_id
        name: m.name,
        pc: true
      }

      return charObj
    })
  }

  getNPCList = () => {
    return this.props.gameLogic.enemyArr.map(e => {
      let role = this.props.party.characters.find(c => c.role === e)

      let charObj = {
        mana: 0,
        armorColor: "red",
        color: "pale",
        role: e,
        health: role.health,
        equipment: [],
        name: "Mr Oinkles",
        pc: false
      }

      return charObj
    })
  }


  componentDidMount = () => {
    this.setState({
      combatants: this.getAllList()
    })
  }

  pcAlive = () => {
    return !!this.state.combatants.find(char => {
      return (char.health > 0 && char.pc)
    })
  }

  npcAlive = () => {
    return !!this.state.combatants.find(char => {
      return (char.health > 0 && !char.pc)
    })
  }

  //TAKE TURNS
  takeTurns = () => {
    if (this.pcAlive() && this.npcAlive()) {
      this.takeTurn(this.state.combatants[this.state.currentTurn])
    } else {
      this.resolveBattle()
    }
  }

  //TURN
  takeTurn = (combatant) => {
    if (combatant.pc) {
      this.takeUserTurn(combatant)
    } else {
      this.takeNPCTurn(combatant)
    }
  }

  takeUserTurn = (char) => {
    // check if alive
    if (char.health > 0) {
      // highlight character

      this.setState({
        rolling: true
      })

      //get equipment bonuses (category, bonus)
      // add more rolls based on cat + bonus

      for (const roll in this.state.rolls) {
        // set some status to damaging
        // turn on click events on ENEMIES
        // decrease remaining damage by 1 for each click
        // decrease health by 1 for each click

        // heal active character

        // add mana to mana pool (persists for fight)
      }

      this.setState({
        spellcasting: true
      })
      // bring up menu based on class
      // Knight - 1 damage to everyone
      // Cleric - Heal Other Character (1 to 1)
      // Mage - Exponential Damage (2 = 1 damage, 3 = 4 damage, 4 = 9 damage, 5 = 16 damage, 6 = 25 damage)
      // Rogue - Extra Turn (4)
    }
  }

  takeNPCTurn = (char) => {

    if (char.health > 0) {
      setTimeout(() => this.npcAttack(char), 300)
    } else {
      this.passTurn()
    }

  }

  npcAttack = (char) => {
    // highlight character
    // all damage unless life is < 50% in which case heal 1-3 and rest damage
    // damage as appropriate
    // damage aims at knight then the lowest HP
    console.log(char.health)
    char.health -= 3
    this.passTurn()
  }

  endSpellcasting = () => {
    this.setState({
      spellcasting: false
    })

    this.passTurn()
  }

  passTurn = () => {

    let currentTurn = this.state.currentTurn + 1

    if (currentTurn >= this.state.combatants.length) {
      currentTurn = 0
    }

    this.setState({ currentTurn }, this.takeTurns)
  }

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

  //ALL CHARACTER ON ONE SIDE DEAD
  resolveBattle = () => {
    let reward = this.state.combatants.filter(c => !c.pc).length * 100
    console.log(reward)
    this.props.earnGold(reward)
    if (this.state.combatants.find(c => (c.pc && c.health > 0))) {
      this.props.addPartyMember(this.state.combatants.find(c => !c.pc))
      //add to team
      //mark square as visited
    } else {
      //send character back to previous square
    }
  }


  renderParty = () => {
    return this.props.party.members.map(m => {
      return <BattleCharacter role={m.role} />
    })
  }

  renderEnemies = () => {
    return this.props.gameLogic.enemyArr.map(e => {
      return <BattleCharacter role={e.role} />
    })
  }

  //should redirect if there is no enemy array
  render() {
    return (
      <div>
        {this.renderParty()}
        {this.renderEnemies()}
        {this.state.rolling ?
          <div>
            <button onClick={this.setDiceRoll}>Roll</button>
            {this.displayDiceRoll()}
          </div>
          :
          null
        }
        {this.state.spellcasting ?
          <div>
            <button onClick={this.endSpellcasting}>Done</button>
          </div>
          :
          null
        }
        <button onClick={this.takeTurns}>Start Battle</button>
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
   return {
     party: {
       members: state.party.party.members,
       characters: state.party.characters,
       inventory: state.party.party.inventory,
       allEquipment: state.party.equipment
     },
     gameLogic: {
       enemyArr: state.gameLogic.enemyArr
     }
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     earnGold: earnGold,
     addPartyMember: addPartyMember
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Battle)
