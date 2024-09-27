// import { useEffect, useState } from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import DarkMode from './components/DarkMode/DarkMode';
import Search from './components/Search';
function App() {

  const [theme, setTheme] = useState("lite");

  return (
    <main className={`app ${theme}`}>
    <DarkMode theme={theme} setTheme={setTheme} />
    <Header theme={theme}/>
    
    <Search />
    </main>
  )
}

export default App
