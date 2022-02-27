import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({children, ...rest}) => {
    let auth = localStorage.getItem("token")

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