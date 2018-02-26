import React from "react";
import Character from "./Character"

class CreateCharacter extends React.Component {
  state = {
    name: "",
    role: "Knight",
    color: "pale",
    armorColor: "red"
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = () => {

  }

  render() {
    return (
      <div>
        <h3>Create Your Party Leader:</h3>
        <div>
          <div className="new-char-avatar">
            <Character character={{
                name: this.state.name,
                role: this.state.role,
                color: this.state.color,
                armorColor: this.state.armorColor
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
          <select name="armorColor" onChange={this.onChange}>
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
export default CreateCharacter
