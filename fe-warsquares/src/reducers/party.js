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
        members: action.party.party.party_characters,
        equipment: action.party.party.party_equipments
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
        gold: state.gold - action.item.amount,
        party: {
          equipment: [...state.party.equipment, action.item]
        }
      }

    default:
      return state
  }
}
