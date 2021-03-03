import { GlobalContext } from '../context/GlobalState';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const Brand = () => {
    return (
        <a 
        className = "text-calypso my-auto font-medium text-3xl"
        href="!#" 
        onClick={(e)=>{e.preventDefault();}}
        >
            BlockByBlock
        </a>
    );
}

const NavLink = ({text,onClick}) => {
    return (
        <a 
        className = {
            `p-2 font-medium text-calypso text-lg mx-4
            transition ease-in-out duration-700 hover:bg-calypso hover:text-white rounded-xl`
        }
        href="!#" 
        onClick={(e)=>{e.preventDefault();onClick()}}
        >
            {text}
        </a>
    )
}

const NavLinks = () => {
    const { isAuthenticated,logoutUser } = useContext(GlobalContext);

    const history = useHistory();

    const goToFeatures = () => {
        history.push("/features");
    }

    const goToAbout = () => {
        history.push("/about");
    }

    const handleLogout = () => {
        logoutUser();
        history.push("/");
    }

    const goToLogin = () => {
        history.push("/login");
    }

    return (
        <div className="flex">
            <NavLink text="Features" onClick={goToFeatures} />
            <NavLink text="About" onClick={goToAbout} />
            {isAuthenticated 
            ? <NavLink text="Logout" onClick={handleLogout} />
            : <NavLink text="Login" onClick={goToLogin} />
            }
        </div>
    );
}

const NavBar = () => {

    return (
        <div className = "flex p-3 m-3 justify-between">
            <Brand />
            <NavLinks />
        </div>
    );
}

export default NavBar;