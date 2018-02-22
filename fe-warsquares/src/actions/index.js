import { LOG_IN } from './types'
import { LOG_OUT } from './types'

export function logIn(user) {
  return { type: LOG_IN, user: user }
}

export function logOut() {
  return { type: LOG_OUT }
}
