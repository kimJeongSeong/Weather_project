import React from 'react'
import { Link } from 'react-router-dom'


const User = () => {
  return (
    <div className='total_user'>
      
      <ul> <Link to="/Thanks">
      <div className='user_img'>
        <p>Name: 김정성</p>
        <p>Age: 26</p>
        <p>Mbti: INTJ</p>
        <p>Blood-Type: A</p>
      </div>
      </Link>
      </ul>

      <div className='computer_img'>
        
      </div>

      
    </div>
  )
}

export default User
