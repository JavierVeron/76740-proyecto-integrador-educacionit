import Alta from './components/Alta'
import CarritoDeCompras from './components/CarritoDeCompras'
import Catalogo from './components/Catalogo'
import Checkout from './components/Checkout'
import APIContextProvider from './components/context/APIContext'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ThankYou from './components/ThankYou'

function App() {
  return (
    <>
      <APIContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Catalogo />} />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='/alta' element={<Alta />} />
            <Route path='/carrito' element={<CarritoDeCompras />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/thankyou/:id' element={<ThankYou />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </APIContextProvider>
    </>
  )
}

export default App
