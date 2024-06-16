import { Route, Routes } from 'react-router-dom'
import './App.css'

import Frontpage from './components/Frontpage'
import Orderlist from './components/Orderlist'
import Itemlist from './components/Itemlist'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Frontpage/>}/>
      <Route path="/orderlist" element={<Orderlist/>}/>
      <Route path="/itemlist" element={<Itemlist/>}/>
    </Routes>
  )
}

export default App
