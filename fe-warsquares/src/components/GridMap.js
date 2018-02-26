import React from "react";
import Square from "./Square"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSquare } from '../actions'

class GridMap extends React.Component {
  state = {
    width: Math.sqrt(this.props.map.visited.length)
  }

  makeSquares = () => {
    let arr = []
    let key = 0
    let tiles = this.props.map.layout.match(/.{2}/g)
    for (let i=0; i < this.state.width; i++) {
      for (let j=0; j < this.state.width; j++) {
        arr.push(<Square
                    x={j}
                    y={i}
                    tile={tiles[key]}
                    visited={this.props.map.visited[key]}
                    key={key++} />)
      }
    }
    return arr
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress)
  }

  //Should move in correct direction
  handleKeyPress = (e) => {
    switch(e.which) {
      case 87:
      case 38:
        this.movePiece(0, -1)
        break;
      case 65:
      case 37:
        this.movePiece(-1, 0)
        break;
      case 83:
      case 40:
        this.movePiece(0, 1)
        break;
      case 68:
      case 39:
        this.movePiece(1, 0)
    }
  }

  movePiece = (xChange, yChange) => {
    if (!this.props.encounter) {
      this.props.selectSquare(xChange, yChange, this.state.width)
    }
  }

  render() {
    return (
      <div className="map-container">
        <div className="grid-box"
             style={{"width": this.state.width * 150, "height": this.state.width * 150}}>
          { this.makeSquares() }
        </div>
      </div>
    )
  }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     selectSquare: selectSquare
   }, dispatch)
 }

 const mapStateToProps = (state) => {
   return {
     encounter: state.gameLogic.encounter
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(GridMap)
