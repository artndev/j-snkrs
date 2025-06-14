import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import IsNotCartEmpty from './outlets/IsNotCartEmpty'
import IsNotLogged from './outlets/isNotLogged'
import Layout from './outlets/Layout'
import Account from './routes/Account'
import Admin from './routes/Admin'
import Cart from './routes/Cart'
import Fallback from './routes/Fallback'
import History from './routes/History'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import Product from './routes/Product'
import Products from './routes/Products'
import RegisterForm from './routes/RegisterForm'

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

          <Route path="/account" element={<Account />} />
          <Route path="/history" element={<History />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/fallback" element={<Fallback />} />
          <Route path="/*" element={<Navigate to={'/fallback'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
