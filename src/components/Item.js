import React from 'react'
import { useParams } from 'react-router-dom'

function Item(props) {
    const { subreddit } = useParams();
  return (
    <div>
      <h1>{subreddit}</h1>
    </div>
  )
}

export default Item