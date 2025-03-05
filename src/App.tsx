import { useState } from 'react';
import Grid from './components/Grid'
import Header from './components/header'
import Keyboard from './components/keyboard'
import './styles.css'

function App() {
   
  const [word, setWord] = useState("");
  
  return (
    <div className="grid h-screen grid-cols-[1fr_1fr_1fr] justify-center">
        <div className='bg-white-600'/>
        <div className='flex flex-col justify-between items-center'>
          <Header/>
          <Grid letter = {word} setBuffer={setWord} />
          <Keyboard setPhrase={setWord}/>
          
        </div> 
        <div className='bg-white-600'/>
    </div>
  )
}

export default App
