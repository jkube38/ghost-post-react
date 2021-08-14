import './App.css';
import React, { useState, useEffect } from 'react'


function App() {
  const [ghostPosts, setGhostPosts] = useState([])

  const url = 'http://127.0.0.1:8000/ghostapi/Post/'
  // const upUrl = 'http://127.0.0.1:8000/ghostapi/Po2/upvote/'
  // const downUrl = 'http://127.0.0.1:8000/ghostapi/Post/2/downvote/'
  
  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => setGhostPosts(data))
  },[]);

  const submitPost = () => {
    let formText = document.getElementById('postText').value
    let formBoastOrRoast = document.getElementById('bOrR').value
    let finalBoastOrRoast
    if(formBoastOrRoast === 'true'){
      finalBoastOrRoast = true
    } else {
      finalBoastOrRoast = false
    }
    let postData = {"boast_or_roast": finalBoastOrRoast, "text": formText}
    fetch(url, {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => console.log(data))

    returnHome()
    
  }

  const createPost = () => {
    return (
      <div id='formHolder'>
        <h1>CREATE POST</h1>
          <select id='bOrR'>
            <option value='true'>BOAST</option>
            <option value='false'>ROAST</option>
          </select>
          <textarea id='postText' placeholder='Create Your Post'></textarea>
          <button onClick={submitPost}>Post Now</button>
      </div>
    )
  }

  const GetPosts = () => {
    let displayPosts = []
    if (ghostPosts.length !== 0){
    for(let p = 0; p < ghostPosts.length; p++){
      let singlePost = ghostPosts[p]
      if(singlePost.boast_or_roast === true){
        displayPosts.push(
          <div className='postHolder' key={p}>
            <h2 className='boast' key={p + singlePost.boast_or_roast}>BOAST</h2>
            <h3 className='post' key={p+p*3500}>POST:</h3>
            <h3 className='text' key={singlePost.text}>{ singlePost.text }</h3>
            <h3 className='likes' key={singlePost.secret_key}>Likes: { singlePost.likes }</h3>
            <h3 className='dislikes' key={singlePost.secret_key + p}>Dislikes: { singlePost.dislikes }</h3>
            <h3 className='time' key={singlePost.created_time}>Posted On: {singlePost.created_time}</h3>
            <h3 className="score" key={singlePost.created_time}>VOTE SCORE: {singlePost.likes - singlePost.dislikes}</h3>
            <button onClick={upVote} value={singlePost.id}>LIKES {singlePost.likes}</button>
            <button onClick={downVote} value={singlePost.id}>DISLIKES {singlePost.dislikes}</button>
  
          </div>
        )
      } else {
        displayPosts.push(
          <div className='postHolder' key={p}>
            <h2 className='boast' key={p + singlePost.boast_or_roast}>ROAST</h2>
            <h3 className='post' key={p+p}>POST:</h3>
            <h3 className='text' key={singlePost.text}>{ singlePost.text }</h3>
            <h3 className='likes' key={singlePost.secret_key}>Likes: { singlePost.likes }</h3>
            <h3 className='dislikes' key={singlePost.secret_key + p}>Dislikes: { singlePost.dislikes }</h3>
            <h3 className='time' key={singlePost.created_time}>Posted On: {singlePost.created_time}</h3>
            <h3 className="score" key={singlePost.created_time}>VOTE SCORE: {singlePost.likes - singlePost.dislikes}</h3>
            <button onClick={upVote} value={singlePost.id}>LIKES {singlePost.likes}</button>
            <button onClick={downVote} value={singlePost.id}>DISLIKES {singlePost.dislikes}</button>
          </div>
        )
      }
    }
      return displayPosts
    } else {
      return createPost()
    }
    
  }



  
  const upVote = event => {
    console.log(event.target.value)
    let postId = event.target.value
    fetch(`http://127.0.0.1:8000/ghostapi/Post/${postId}/upvote/`, {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({'text': 'updateVote'})
    })
    .then(res => res.json())
    .then(data => console.log(data, 'right here'))
    
    returnHome()
  }

  const downVote = event => {
    console.log(event.target.value)
    let postId = event.target.value
    fetch(`http://127.0.0.1:8000/ghostapi/Post/${postId}/downvote/`, {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({'text': 'downVote'})
    })

    .then(res => res.json())
    .then(data => console.log(data, 'right here'))
    
    returnHome()
  }

  
  const boastUrl = 'http://127.0.0.1:8000/ghostapi/Post/boasts/'
  const roastUrl = 'http://127.0.0.1:8000/ghostapi/Post/roasts/'
  const sortedUrl = 'http://127.0.0.1:8000/ghostapi/Post/sorted/'

    const boasts = () => {
        fetch(boastUrl)
        .then(res => res.json())
        .then(data => setGhostPosts(data))
        
    }

    const roasts = () => {
        fetch(roastUrl)
        .then(res => res.json())
        .then(data => setGhostPosts(data))
        
    }

    const sorted = () => {
        fetch(sortedUrl)
        .then(res => res.json())
        .then(data => setGhostPosts(data))
        
    }

    const makePost = () => {
      setGhostPosts([])
    }

    const returnHome = () => {
      fetch(url)
      .then(res => res.json())
      .then(data => setGhostPosts(data))
    }
  

  return (
    <div id='contentHolder'>
      <div id='headerHolder'>
            <button onClick={returnHome}>HOME</button>
            <button onClick={boasts}>BOASTS</button>
            <button onClick={roasts}>ROASTS</button>
            <button onClick={sorted}>SORT BY VOTES</button>
            <button onClick={makePost}>POST</button>
            <h1>GHOST POST</h1>
        </div>
      <GetPosts />
    </div>
  )
}

export default App;
