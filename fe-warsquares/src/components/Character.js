import React from 'react'

const Character = ({character}) => {

  console.log(character)

  return(
    <div>{character.name}</div>
  )
}

export default Character
