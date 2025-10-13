import { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import './App.css'
import Moodsongs from './components/MoodSongs'

function App() {
  
  const [songs, setsongs] = useState([
    ])

  return (
    <>
      <FacialExpression setsongs={setsongs}/>
      <Moodsongs songs={songs}/>
    </>
  )
}

export default App
