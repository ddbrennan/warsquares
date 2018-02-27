const baseUrl = 'http://localhost:3001'

class PartyAdapter {

  static getUserParty(user) {
    return fetch(`${baseUrl}/parties`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(user)
    }).then(res => res.json())
  }

  static updateParty(id, data) {
    return fetch(`${baseUrl}/parties/${id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(data)
    }).then(res => res.json())
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}

export default PartyAdapter
