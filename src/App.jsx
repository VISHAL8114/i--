import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sample from './Sample';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sample />
    </>
  )
}

export default App
