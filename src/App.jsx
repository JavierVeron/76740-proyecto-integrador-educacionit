import Alta from './components/Alta'
import CarritoDeCompras from './components/CarritoDeCompras'
import Catalogo from './components/Catalogo'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Catalogo />} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/alta' element={<Alta />} />
          <Route path='/carrito' element={<CarritoDeCompras />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
