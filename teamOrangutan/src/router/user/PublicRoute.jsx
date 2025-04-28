import { useContext } from "react"
import { AuthContext } from "../../Auth/user/context/AuthContext"
import { Navigate } from "react-router-dom"



export const PublicRoute = ({children}) => {
    const  {isAuthenticated} = useContext(AuthContext)
    
    return (
        isAuthenticated ? <Navigate to='/home' /> : children
  )
}

export default PublicRoute
