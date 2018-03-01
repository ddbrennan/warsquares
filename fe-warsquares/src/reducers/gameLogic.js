export default (state = {
  selectedSquare: [0,0],
  previousSquare: [0,0],
  encounter: false,
  enemies: "",
  hasTabard: false,
  enemyArr: [],
  currentMap: null,
  questing: false
}, action) => {
  switch(action.type) {

    case 'SELECT_SQUARE':
      let previousSquare = state.selectedSquare
      let newX = state.selectedSquare[0] + action.change.x
      let newY = state.selectedSquare[1] + action.change.y
      const newSelection = [
        (newX >= 0 && newX < action.change.width) ? newX : state.selectedSquare[0],
        (newY >= 0 && newY < action.change.width) ? newY : state.selectedSquare[1]
      ]
      return {...state, selectedSquare: newSelection, previousSquare: previousSquare }

    case 'START_ENCOUNTER':
      return {...state, encounter: true, enemies: action.tile}

    case 'SET_ENEMIES':
      return {...state, enemyArr: action.enemyArr }

    case 'ENTER_BATTLE':
      return {...state, currentMap: action.id, questing: true}

    case 'RESOLVE_ENCOUNTER':
      return {...state, questing: true, encounter: false}

    case 'STOP_QUESTING':
      return {...state, questing: false }

    default:
      return state
  }
}
