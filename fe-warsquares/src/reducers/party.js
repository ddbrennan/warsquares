export default (state = {
  party: {},
  equipment: [],
  characters: [],
  gold: 0,
  map: {}
}, action) => {
  switch(action.type) {
    case 'IMPORT_PARTY':

      const party = {
        name: action.party.party.name,
        id: action.party.party.id,
        members: action.party.party.party_characters,
        inventory: action.party.party.party_equipments
      }

      const map = {
        ...action.party.party.maps[0],
        ...action.party.party.party_maps[0]
      }

      return {
        ...state,
        characters: action.party.characters,
        equipment: action.party.equipment,
        party: party,
        map: map,
        gold: action.party.party.gold
      }

    case 'LOG_OUT':
      return {
        party: {},
        equipment: [],
        characters: [],
        gold: 0,
        map: {}
      }

    case 'PURCHASE_ITEM':
      return {
        ...state,
        gold: action.gold,
        party: {
          inventory: action.pes
        }
      }

    case 'EARN_GOLD':
      return {
        ...state,
        gold: state.gold + action.amount
      }

    case 'ADD_PARTY_MEMBER':
      return {
        ...state,
        party: {
          members: [
            ...state.party.members,
            action.character
          ]
        }
      }

    default:
      return state
  }
}
