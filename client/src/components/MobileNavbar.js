import { GlobalContext } from "../context/GlobalState";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaBars, FaAngleDoubleRight } from "react-icons/fa";

const Brand = () => {
  const history = useHistory();
  return (
    <a
      className="text-calypso z-40 my-auto font-medium text-3xl"
      href="!#"
      onClick={(e) => {
        e.preventDefault();
        history.push("/");
      }}
    >
      BlockByBlock
    </a>
  );
};

const NavLink = ({ text, onClick }) => {
  return (
    <a
      className={`p-2 font-medium text-calypso text-lg mx-4
            transition ease-in-out duration-700 hover:bg-calypso hover:text-white rounded-xl`}
      href="!#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </a>
  );
};

const NavLinks = ({ setNavOpen }) => {
  const { isAuthenticated, logoutUser } = useContext(GlobalContext);

  const history = useHistory();

  const goToFeatures = () => {
    history.push("/features");
    setNavOpen(false);
  };

  const goToAbout = () => {
    history.push("/about");
    setNavOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    history.push("/");
    setNavOpen(false);
  };

  const goToLogin = () => {
    history.push("/login");
    setNavOpen(false);
  };

  return (
    <div className="flex flex-col my-auto">
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

export default function MobileNavbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div
      className={
        (navOpen ? "h-screen" : "") +
        " flex flex-col md:hidden w-full z-50 bg-spring-rain max-w-screen-xl fixed top-0 flex p-3"
      }
    >
      <div className="flex w-full justify-between">
        <Brand />
        {navOpen ? (
          <FaAngleDoubleRight
            className="text-xl my-auto text-calypso"
            onClick={() => setNavOpen(false)}
          />
        ) : (
          <FaBars
            className="text-xl my-auto text-calypso"
            onClick={() => setNavOpen(true)}
          />
        )}
      </div>

      {navOpen && <NavLinks setNavOpen={setNavOpen} />}
    </div>
  );
}
