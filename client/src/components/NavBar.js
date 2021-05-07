import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

const Brand = () => {
  const history = useHistory();
  return (
    <a
      className="text-calypso my-auto font-medium text-3xl"
      href="!#"
      onClick={(e) => {
        e.preventDefault();
        history.push("/home");
      }}
    >
      BlockByBlock
    </a>
  );
};

const NavLink = ({ text, onClick, href }) => {
  return (
    <a
      className={`p-2 font-medium text-calypso text-lg mx-4
            transition ease-in-out duration-700 hover:bg-calypso hover:text-white rounded-xl`}
      href={href || "#"}
      onClick={(e) => {
        !href && e.preventDefault();
        onClick && onClick();
      }}
    >
      {text}
    </a>
  );
};

const NavLinks = () => {
  const { isAuthenticated, logoutUser } = useContext(GlobalContext);

  const history = useHistory();

  const goToFeatures = () => {
    history.push("/features");
  };

  const goToAbout = () => {
    history.push("/about");
  };

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };

  const goToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="hidden md:flex">
      <NavLink
        text="Github"
        href="https://github.com/Schapagain/habit-tracker"
      />
      <NavLink text="Features" onClick={goToFeatures} />
      <NavLink text="About" onClick={goToAbout} />
      {isAuthenticated ? (
        <NavLink text="Logout" onClick={handleLogout} />
      ) : (
        <NavLink text="Login" onClick={goToLogin} />
      )}
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="w-full z-50 bg-spring-rain max-w-screen-xl fixed top-0 flex p-3 justify-between">
      <Brand />
      <NavLinks />
    </div>
  );
};

export default NavBar;
