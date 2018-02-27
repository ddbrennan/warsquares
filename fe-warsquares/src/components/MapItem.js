import React from "react";

class MapItem extends React.Component {

  render() {

    console.log("MapItem: ", this.props)

    return (
      <div>
        <h3>Map</h3>
        <div>Name: {this.props.map.name}</div>
        <div>Size: {Math.floor(Math.sqrt(this.props.info.visited.length))}</div>
        <div>Complete: {this.props.info.completed ? "Yup" : "Nope"}</div>
      </div>
    )
  }
 }
export default MapItem
