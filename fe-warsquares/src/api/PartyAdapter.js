const baseUrl = 'http://localhost:3001'

class PartyAdapter {

  static getUserParty(user) {
    return fetch(`${baseUrl}/parties`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(user)
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
