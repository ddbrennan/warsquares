import React from "react";
import Character from "./Character"
import PartyAdapter from "../api/PartyAdapter"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { importParty } from '../actions'

class CreateCharacter extends React.Component {
  state = {
    name: "",
    role: "Knight",
    color: "pale",
    armor_color: "red"
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    if (this.state.name) {
      PartyAdapter.createParty({member: this.state, name: `${this.props.user.username}'s Party`, user_id: this.props.user.id})
        .then(this.props.importParty)
    }
  }

  render() {
    return (
      <div id="create-container">
        <div className="party-name">
          <h1>CREATE YOUR CHARACTER</h1>
        </div>
        
        <div>
          <div className="new-char-avatar">
            <Character character={{
                name: this.state.name,
                role: this.state.role,
                color: this.state.color,
                armor_color: this.state.armor_color
              }}></Character>
            </div>
          <h2>{`${this.state.name} the ${this.state.role}`}</h2>
        </div>
        <form onSubmit={this.submitForm}>
          <input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder="Character Name"></input>
          <select name="role" onChange={this.onChange}>
            <option value="Knight">Knight</option>
            <option value="Cleric">Cleric</option>
            <option value="Rogue">Rogue</option>
            <option value="Mage">Mage</option>
          </select>
          <select name="armor_color" onChange={this.onChange}>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <select name="color" onChange={this.onChange}>
            <option value="pale">1</option>
            <option value="tan">2</option>
            <option value="brown">3</option>
            <option value="dark">4</option>
          </select>
          <input type="submit" value="Create Character"></input>
        </form>
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
    return {
      user: state.auth.user
    }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     importParty: importParty
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacter)
