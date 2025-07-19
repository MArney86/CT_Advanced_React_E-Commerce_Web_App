import { Routes, Route } from 'react-router-dom'
import NavHeader from './components/NavHeader'
import './App.css'
import Home from './components/Home'
//import CartPage from './components/CartPage'
import NotFound from './components/NotFound'

function App() {
    return (
      <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Uncomment the following lines when CartPage and NotFound components are available
        <Route path="/cart" element={<CartPage />} />
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
    )
}

export default App
