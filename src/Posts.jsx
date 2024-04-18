import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = ()  => {

    // Komponentin tilan määritys
const [posts, setPosts] = useState([])

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json()) //muutetaan json data javascriptksi
    .then(oliot => setPosts(oliot))
}
,[]
)

  return (
    <>
        <h2>Post from typicode</h2>

        {
            posts && posts.map(p => 
                <div className='posts' key={p.id}>
                <h4>{p.title}</h4>
                <h5>User: {p.userId}</h5>
                <p>{p.body}</p>
                </div>
                )
        }

    </>
  )
}

export default Posts