import React from 'react'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="w-screen h-screen bg-blue-400 flex justify-center items-center">
    Music App
    <Routes>
      <Route path='/login'/>
    </Routes>
    </div>
  )
}

export default App
