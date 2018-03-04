import React from "react";
import { connect } from 'react-redux'
import { enterBattle, importParty } from '../actions'
import PartyAdapter from "../api/PartyAdapter"


class MapItem extends React.Component {

  deleteMap = () => {
    PartyAdapter.updateParty(this.props.id, {map: {id: this.props.info.id, delete: true}, gold: this.props.gold})
      .then(this.props.importParty)
  }

  render() {

    return (
      <div>
        <div onClick={() => this.props.enterBattle(this.props.map.id, this.props.info.current_square)}>
          <h3>Map</h3>
          <div>Name: {this.props.map.name}</div>
          <div>Size: {Math.floor(Math.sqrt(this.props.info.visited.length))}</div>
          <div>Moves Taken: {this.props.info.moves}</div>
          <div>Complete: {this.props.info.complete ? "Yup" : "Nope"}</div>
        </div>
        <button onClick={this.deleteMap}>Delete Map</button>
      </div>
    )
  }
 }

const mapStateToProps = (state) => {
  return {
    id: state.party.party.id,
    gold: state.party.gold
  }
}

export default connect(mapStateToProps, { enterBattle, importParty })(MapItem)
