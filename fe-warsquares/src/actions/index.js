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

export function purchaseItem(gold, pes) {
  return { type: 'PURCHASE_ITEM', gold: gold, pes: pes}
}

export function earnGold(amount) {
  return { type: 'EARN_GOLD', amount: amount}
}

export function addPartyMember(character) {
  return {type: 'ADD_PARTY_MEMBER', character: character }
}

export function deleteParty() {
  return { type: 'DELETE_PARTY' }
}

export function createMap(data) {
  return { type: 'CREATE_MAP', data: data }
}

export function enterBattle(id) {
  return { type: 'ENTER_BATTLE', id: id }
}

export function stopQuesting() {
  return { type: 'STOP_QUESTING' }
}
