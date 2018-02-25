export default (state = {
  selectedSquare: [0,0],
  encounter: false,
  enemies: "",
  hasTabard: false
}, action) => {
  switch(action.type) {
    case 'SELECT_SQUARE':
      let newX = state.selectedSquare[0] + action.change.x
      let newY = state.selectedSquare[1] + action.change.y
      const newSelection = [
        (newX >= 0 && newX < action.change.width) ? newX : state.selectedSquare[0],
        (newY >= 0 && newY < action.change.width) ? newY : state.selectedSquare[1]
      ]
      return {...state, selectedSquare: newSelection }
    case 'START_ENCOUNTER':
      return {...state, encounter: true, enemies: action.tile}
    default:
      return state
  }
}
