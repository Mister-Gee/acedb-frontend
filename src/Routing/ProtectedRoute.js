import {Route, useLocation, Redirect} from 'react-router-dom';


const ProtectedRoute = ({children, ...rest}) => {
    let auth = localStorage.getItem("token")
    const locations = useLocation()

    return (
        <Route
            {...rest}
            render={({location}) => 
                auth ? (
                    children
                    ) : 
                    (
                    <Redirect to={{
                        pathname: "/",
                        state: {from: location},
                    }} />
                     )
            }
        />

    )
}



export default ProtectedRoute;