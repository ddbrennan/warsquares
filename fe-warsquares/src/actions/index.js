import { LOG_IN } from './types'

export function logIn(user) {
  return { type: LOG_IN, user: user }
}
