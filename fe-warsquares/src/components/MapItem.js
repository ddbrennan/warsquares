import React from "react";
import { connect } from 'react-redux'
import { enterBattle } from '../actions'

class MapItem extends React.Component {

  render() {

    return (
      <div onClick={() => this.props.enterBattle(this.props.map.id)}>
        <h3>Map</h3>
        <div>Name: {this.props.map.name}</div>
        <div>Size: {Math.floor(Math.sqrt(this.props.info.visited.length))}</div>
        <div>Complete: {this.props.info.completed ? "Yup" : "Nope"}</div>
      </div>
    )
  }
 }
export default connect(null, { enterBattle })(MapItem)
