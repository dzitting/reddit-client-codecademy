import React from 'react'
import { useParams } from 'react-router-dom'

function ItemInformation() {
    const subreddit = useParams();
  return (
    <div>ItemInformation</div>
  )
}

export default ItemInformation;