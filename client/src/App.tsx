import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IsNotLogged from './outlets/isNotLogged'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import RegisterForm from './routes/RegisterForm'
import Fallback from './routes/Fallback'
import Layout from './outlets/Layout'

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

          <Route path="fallback" element={<Fallback />} />
          <Route path="*" element={<h3>Blank page</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
