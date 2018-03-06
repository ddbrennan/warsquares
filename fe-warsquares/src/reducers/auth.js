export default (state = [{
  isLoggedIn: false,
  user: {}
}], action) => {
  switch(action.type) {
    case 'LOG_IN':
      console.log("logging in!", action.user)
      return {isLoggedIn: true, user: action.user}
    case 'LOG_OUT':
      return {isLoggedIn: false, user: {}}
    default:
      return state
  }
}
