import React from "react"
import { Link } from 'react-router-dom'

class Party extends React.Component {

  render() {
    return (
      <div>
        <Link to="/battlefield">Battle</Link>
        <Link to="/store">Store</Link>

        <div>
          <h3>Character 1</h3>
          <p>Stats</p>
          <div>Item</div>
        </div>

        <div>
          <h3>Character 2</h3>
          <p>Stats</p>
          <div>Item</div>
        </div>

        <div>
          <h3>Character 3</h3>
          <p>Stats</p>
          <div>Item</div>
        </div>

        <div>
          <h3>Character 4</h3>
          <p>Stats</p>
          <div>Item</div>
        </div>
      </div>
    )
  }
 }
export default Party
