import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MapsAdapter from "../api/MapsAdapter"
import { createMap } from '../actions'
import MapItem from './MapItem'

class MapDisplay extends React.Component {

  state = {
    name: "",
    width: ""
  }

  //LIST OF MAPS
  listMaps = () => {

    if (this.props.maps) {
      return this.props.maps.map(m => <div><MapItem map={m.map} info={m.info} /></div>)
    }
  }
  // Active Map

  // Incomplete Maps

  // Completed Maps (move count)

  // Delete Map From List

  createMap = (e) => {
    e.preventDefault()

    const tiles = ["F", "M", "S", "W"]
    let width = this.state.width
    let mapLayout = "F0"
    let tile = ""

    let castle = Array(((width-1)*width)/2).fill("N")
    castle[Math.floor(Math.random() * castle.length)] = "C"

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {

        let type = tiles[Math.floor(Math.random() * 4)]
        let num = Math.floor(Math.random() * 3)

        if (x+y < width && x+y > width/2) {
          num += 3
        } else if (x+y >= width) {
          num += 6
          if (castle.pop() === "C") {
            type = "C"
            num = 9
          }
        }
        if (x+y > 0) {
          mapLayout += (type + num)
        }
      }
    }

    let visited = "1"
    for (let i = 0; i < (mapLayout.length/2 - 1); i++) {
      visited += "0"
    }

    MapsAdapter.createMap({name: this.state.name, layout: mapLayout, visited: visited, party_id: this.props.id})
      .then(this.props.createMap)
    // this.props.createMap(this.state.name, mapLayout)

    this.setState({
      name: "",
      width: ""
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        {this.listMaps()}
        <h3>Generate New Map</h3>
        <form onSubmit={this.createMap}>
          <label>Name Your Map
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
          </label>
          <select name="width" onChange={this.handleChange} value={this.state.width}>
            <option disabled value="">SELECT A SIZE</option>
            <option value="4">4 x 4</option>
            <option value="5">5 x 5</option>
            <option value="6">6 x 6</option>
            <option value="7">7 x 7</option>
          </select>
          <input type="submit" value="Create Map"></input>
        </form>
      </div>
    )
  }
 }

const mapStateToProps = (state) => {
  return {
    maps: state.party.maps,
    id: state.party.party.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createMap: createMap
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay)
