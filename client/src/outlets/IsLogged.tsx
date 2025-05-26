import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/Auth'

const IsLogged = () => {
  const { auth } = useAuthContext()

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>
}

export default IsLogged
