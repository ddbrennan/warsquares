import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startEncounter } from '../actions'


class Square extends React.Component {

  componentDidUpdate = (prevProps, prevState) => {
    if (!!this.isSelected() && !parseInt(this.props.visited)) {
      this.props.startEncounter(this.props.tile)
    }
  }

  determineClass = () => {
    console.log(this.props.tile[0])

    switch(this.props.tile[0]) {
      case 'M':
        return "mountain"
      case 'F':
        return "field"
      case 'W':
        return "woods"
      case 'S':
        return "swamp"
      case 'C':
        return "castle"
    }
  }

  isSelected = () => {
    return this.props.x === this.props.selectedSquare[0] && this.props.y === this.props.selectedSquare[1] ? 'selected' : ''
  }

  render() {
    return (
      <div>
        <div
          className={`square ${this.determineClass()} ${this.isSelected()}`}>
        </div>
      </div>
    )
  }
 }

 const mapStateToProps = (state) => {
    return {
      selectedSquare: state.gameLogic.selectedSquare
    }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     startEncounter: startEncounter
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Square)
