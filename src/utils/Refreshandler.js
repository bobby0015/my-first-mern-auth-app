import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Refreshandler = ({ setisAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setisAuthenticated(true);
            if (location.pathname === "/login" || location.pathname === "/signup") {
                navigate("/", { replace: false });
            }
        }
    }, [location, navigate, setisAuthenticated]);

    return null;
}

export default Refreshandler
