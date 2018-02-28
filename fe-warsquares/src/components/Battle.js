import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { } from '../actions'
import BattleCharacter from './BattleCharacter'
import { earnGold, addPartyMember } from '../actions'
import PartyAdapter from '../api/PartyAdapter'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'


class Battle extends React.Component {
  state = {
    rolls: [],
    locked: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false},
    combatants: [],
    rolling: false,
    spellcasting: false,
    currentTurn: 0,
    rollCount: 0
  }

  getAllList = () => {
    if (this.props.enemies && this.props.allies) {
      const enemies = this.props.enemies
      const allies = this.props.allies
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

  }


  componentDidMount = () => {
    this.setState({
      combatants: this.getAllList()
    })
  }

  pcAlive = () => {
    return !!this.state.combatants.find(char => {
      return (char.health > 0 && char.party_id !== 0)
    })
  }

  npcAlive = () => {
    return !!this.state.combatants.find(char => {
      return (char.health > 0 && char.party_id === 0)
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
    if (combatant.party_id !== 0) {
      this.startUserTurn(combatant)
    } else {
      this.takeNPCTurn(combatant)
    }
  }

  startUserTurn = (char) => {
    // check if alive
    if (char.health > 0) {
      // highlight character
      this.dicePhase()
    } else {
      this.passTurn()
    }
  }

  dicePhase = () => {
    this.setState({
      rolling: true
    })
  }

  evaluateDice = () => {
    //get equipment bonuses (category, bonus)
    // add more rolls based on cat + bonus

    // for (const roll in this.state.rolls) {
      // set some status to damaging
      // turn on click events on ENEMIES
      // decrease remaining damage by 1 for each click
      // decrease health by 1 for each click

      // heal active character

      // add mana to mana pool (persists for fight)
  }

  startSpellcasting = () => {
    this.setState({
      assigningDamage: false,
      spellcasting: true
    })
  }
  // bring up menu based on class
  // Knight - 1 damage to everyone
  // Cleric - Heal Other Character (1 to 1)
  // Mage - Exponential Damage (2 = 1 damage, 3 = 4 damage, 4 = 9 damage, 5 = 16 damage, 6 = 25 damage)
  // Rogue - Extra Turn (4)



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
    char.health -= 20
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
    let newRC = this.state.rollCount + 1
    let doneRolling = false
    if (newRC > 2) {
      doneRolling = true
    }

    this.setState({
      rolls: rolls,
      rollCount: newRC,
      assigningDamage: doneRolling
    })
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
    let reward = this.state.combatants.filter(c => (!c.party_id && c.health < 1)).length * 100
    // this.props.earnGold(reward)
    if (this.state.combatants.find(c => (!!c.party_id && c.health > 0))) {
      // PartyAdapter.updateParty(this.props.party.partyId, {character: this.props.enemies[0], gold: this.props.gold + reward})
      //   .then(
      this.props.addPartyMember(this.props.enemies[0])
      //mark square as visited
      //remove from enemy array
      //current square updated
      //encounter false, questing true
    } else {
      //send character back to previous square
    }
  }


  renderParty = () => {
    return this.props.allies.map(m => {
       return <div className="battle-char"><BattleCharacter character={m} /></div>
    })
  }

  renderEnemies = () => {
    return this.props.enemies.map(e => {
      return <div className="battle-char"><BattleCharacter character={e} /></div>
    })
  }

  //should redirect if there is no enemy array
  render() {
    return (
      <div>
        { this.props.auth.isLoggedIn ?
          <div>


                  <button onClick={this.takeTurns}>Start Battle</button>
                  <div class="allies-container">
                    {this.renderParty()}
                  </div>
                  <div class="enemies-container">
                    {this.renderEnemies()}
                  </div>
                  {this.state.rolling && this.state.rollCount < 3 ?
                    <div>
                      <button onClick={this.setDiceRoll}>Roll</button>
                      {this.displayDiceRoll()}
                    </div>
                    :
                    null
                  }
                  {this.state.assigningDamage ?
                    <div>
                      {this.evaluateDice()}
                      <div>Click people to damage them.</div>
                      <button onClick={this.startSpellcasting}>Done</button>
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

                  {this.props.questing ?
                    <Link to="/battlefield">Back to the Map</Link>
                    :
                    null
                  }


          </div>
          :
          <Redirect to="/home" />
          }
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
   return {
     party: {
       inventory: state.party.party.inventory,
       allEquipment: state.party.equipment,
       partyId: state.party.party.id
     },
     gold: state.party.gold,
     enemies: state.gameLogic.enemyArr,
     allies: state.party.party.members,
     questing: state.gameLogic.questing,
     auth: {
       isLoggedIn: state.auth.isLoggedIn,
       user: state.auth.user
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
