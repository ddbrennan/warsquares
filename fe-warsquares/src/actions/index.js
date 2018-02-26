export function logIn(user) {
  return { type: 'LOG_IN', user: user }
}

export function logOut() {
  return { type: 'LOG_OUT' }
}

export function importParty(party) {
  return { type: 'IMPORT_PARTY', party: party }
}

export function selectSquare(x,y,width) {
  return { type: 'SELECT_SQUARE', change: {x: x, y: y, width: width} }
}

export function startEncounter(tile) {
  return { type: 'START_ENCOUNTER', tile: tile }
}

export function setEnemies(enemyArr) {
  return { type: 'SET_ENEMIES', enemyArr: enemyArr }
}

export function purchaseItem(item) {
  return { type: 'PURCHASE_ITEM', item: item}
}
