import React from "react"
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PartyAdapter from "../api/PartyAdapter"
import { importParty, deleteParty, updateParty } from '../actions'
import Character from './Character'
import MapDisplay from './MapDisplay'
import CreateCharacter from './CreateCharacter'



class Party extends React.Component {
  state = {
    editing: false,
    name: this.props.party.name,
    heldEquipment: ""
  }

  componentDidMount = () => {
    if (this.props.auth.user) {
      PartyAdapter.getUserParty(this.props.auth.user.id)
        .then(this.props.importParty)
      }
  }

  mapMembers = () => {
    if (this.props.party.members) {
      return this.props.party.members.map(m => {
        return (<div className="party-display-char">
                  <Character key={m.id} character={m} />
                  <h3> {m.name} </h3>
                  <div onClick={this.equipItem} id={`${m.id}member`}>Inventory</div>
                </div>)
              })
    }
  }

  equipItem = (e) => {
    let oldEquip = this.props.party.equipment.find(item => item.owner_id === parseInt(e.target.id))
    if (oldEquip) {
      oldEquip.owner_id = null
    }

    let newEquip = this.props.party.equipment.find(item => item.id === parseInt(this.state.heldEquipment))
    newEquip.owner_id = parseInt(e.target.id)
    newEquip.update = true

    this.setState({
      heldEquipment: ""
    })

    //send info to DB
    PartyAdapter.updateParty(this.props.party.id, {item: newEquip, gold: this.props.party.gold})
  }

  pickUpItem = (e) => {
    this.setState({
      heldEquipment: e.target.id
    })
  }

  mapEquipment = () => {
    if (this.props.party.equipment) {
      return this.props.party.equipment.map(e => {
        let equip = this.props.party.equipmentAll.find(item => item.id === e.equipment_id)
        let user = this.props.party.members.find(member => member.id === e.owner_id)
        return <div onClick={this.pickUpItem} id={`${e.id}equip`} className="party-equipment-display">{equip.name} equipped to {user ? user.name : "no one"}</div>
      })
    }
  }

  deleteParty = () => {
    PartyAdapter.deleteParty(this.props.party.id)
      .then(this.props.deleteParty)
  }

  startEditing = () => {
    this.setState({
      editing: true
    })
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  changeTeamName = (e) => {
    e.preventDefault()
    this.setState({
      editing: false
    })
    PartyAdapter.updateParty(this.props.party.id, {name: this.state.name})
      .then(this.props.importParty)
  }

  render() {
    return (
      <div>
        {this.props.auth.isLoggedIn ?
            <div>
              { this.props.party.name ?
                <div>
                  {!this.props.questing ?
                    <div>
                      <Link to="/store">Store</Link>

                      {this.state.editing ?
                      <form>
                        <input type="text" value={this.state.name} onChange={this.handleChange}></input>
                        <input type="submit" onSubmit={this.changeTeamName}></input>
                      </form>
                      :
                      <h1 onClick={this.startEditing}>{this.props.party.name && this.props.party.name.toUpperCase()}</h1>
                      }

                      <MapDisplay />

                      <div className="party-members">{this.mapMembers()}</div>
                      <div className="inventory">{this.mapEquipment()}</div>
                      <p>Gold Available: {this.props.party.gold}</p>
                      <button onClick={this.deleteParty}>Delete Party</button>
                    </div>
                    :
                    <Redirect to="/battlefield"></Redirect>
                  }
                </div>
                :
                <CreateCharacter />
                }
            </div>
          :
            <Redirect to="/home"></Redirect>
        }
      </div>
    )
  }
 }


 const mapStateToProps = (state) => {

   return {
     auth: {
       isLoggedIn: state.auth.isLoggedIn,
       user: state.auth.user
     },
     party: {
       name: state.party.party.name,
       members: state.party.party.members,
       equipment: state.party.party.inventory,
       equipmentAll: state.party.equipment,
       id: state.party.party.id,
       gold: state.party.gold
     },
     questing: state.gameLogic.questing

   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     importParty: importParty,
     deleteParty: deleteParty
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Party)
