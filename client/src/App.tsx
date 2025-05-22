import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IsNotLogged from './outlets/isNotLogged'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import RegisterForm from './routes/RegisterForm'
import Fallback from './routes/Fallback'
import Layout from './outlets/Layout'
import Products from './routes/Products'
import Product from './routes/Product'
import Cart from './routes/Cart'
import IsNotCartEmpty from './outlets/IsNotCartEmpty'

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<IsNotLogged />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>

          <Route element={<IsNotCartEmpty />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />

          <Route path="/fallback" element={<Fallback />} />
          <Route path="*" element={<h3>Blank page</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
