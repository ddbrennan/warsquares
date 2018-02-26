import React from "react"
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PartyAdapter from "../api/PartyAdapter"
import { importParty } from '../actions'
import Character from './Character'



class Party extends React.Component {

  componentDidMount = () => {
    PartyAdapter.getUserParty(this.props.auth.user)
      .then(this.props.importParty)
  }

  // fetch the party
  //  if there isn't one, create character
  //  delete part button?
  // should know members, equipment, gold and current map

  //create character
  // pick a class
  // choose colors

  //party members
  // name
  // class, colors
  // stats
  // equipment

  // inventory
  //  all items you own that aren't equipped
  // gold

  //EMBARK ON JOURNEY
  embark = (e) => {

    const tiles = ["F", "M", "S", "W"]
    let width = e.target.value
    let mapLayout = "F0"
    let tile = ""

    let castle = Array(((width-1)*width)/2).fill("N")
    castle[Math.floor(Math.random() * castle.length)] = "C"

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {

        let type = tiles[Math.floor(Math.random() * 4)]
        let num = Math.floor(Math.random() * 3)

        if (x+y < width && x+y > 0) {
          num += 3
        } else if (x+y > 0){
          num += 6
          if (castle.pop() === "C") {
            type = "C"
            num = 9
          }
        }

        mapLayout += (type + num)
      }
    }

    console.log(mapLayout)
  }

  // get map from DB


  mapMembers = () => {
    if (this.props.party.members) {
      return this.props.party.members.map(m => <Character key={m.id} character={m} />)
    }
  }


  render() {
    return (
      <div>
        {this.props.auth.isLoggedIn ?
          <div>

            <Link to="/battlefield">Battle</Link>
            <Link to="/store">Store</Link>

            <input type="number" placeholder="Width of Map" onChange={this.embark}></input>

            <h1>{this.props.party.name && this.props.party.name.toUpperCase()}</h1>
            {this.mapMembers()}
          </div>
        :
          <Redirect to="/home"/>
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
       equipment: state.party.party.equipment
     }
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     importParty: importParty
   }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Party)
