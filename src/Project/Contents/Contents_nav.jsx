import React from 'react'
import { Link } from 'react-router-dom'

const Contents_nav = () => {
  return (
    <div className='contents_nav'>
        <ul>
            <li><Link to="/News">News</Link></li>
            <li><Link to="/Game">Game</Link></li>
            <li><Link to="/Fortune">Typing</Link></li>
            <li><Link to="/Thanks">Info</Link></li>
        </ul>
      
    </div>
  )
}

export default Contents_nav
