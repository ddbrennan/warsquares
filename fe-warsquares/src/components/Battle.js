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
    },
    rolling: false
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
        name: m.name
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
        name: "Mr Oinkles"
      }

      return charObj
    })
  }

  getAllList = () => {
    const enemies = this.props.gameLogic.enemyArr
    const allies = this.props.party.members
    let cap = Math.max(enemies.length, allies.length)
    let allList = []

    for (let i = 0; i < cap; i++) {
      if (allies[i]) {
        allList.push("p" + i)
      }
      if (enemies[i]) {
        allList.push("n" + i)
      }
    }

    return allList
  }

  componentDidMount = () => {

    this.setState({
      combatants: {
        pc: this.getPCList(),
        npc: this.getNPCList(),
        all: this.getAllList()
      }
    })

  }

  pcAlive = () => {
    return !!this.state.combatants.pc.find(char => {
      return char.health > 0
    })
  }

  npcAlive = () => {
    return !!this.state.combatants.npc.find(char => {
      return char.health > 0
    })
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
    if (combatant[0] === "p") {
      this.takeUserTurn(combatant[1])
    } else {
      this.takeNPCTurn(combatant[1])
    }
  }

  takeUserTurn = (num) => {
    // get character
    let char = this.state.combatants.pc[num]

    // check if alive
    if (char.health > 0) {
      // highlight character
      this.setState({
        rolling: true
      })
      // if so call up dice
      // roll twice
      //get equipment bonuses
      this.state.rolls
      // calculate damage
      // calculate healing
      // calculate mana
      // cast spells
    }

    //pass turn
  }

  takeNPCTurn = (num) => {

    let char = this.state.combatants.npc[num]

    if (char.health > 0) {
      // highlight character
      // all damage unless life is < 50% in which case heal 1-3 and rest damage
      // damage as appropriate
      // damage aims at knight then the lowest HP
    }

    // pass turn
    this.state.combatants.npc[num].health = 0

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
        {this.state.rolling ?
          <div>
            <button onClick={this.setDiceRoll}>Roll</button>
            {this.displayDiceRoll()}
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
       equipment: state.party.party.equipment,
       allEquipment: state.party.equipment
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
