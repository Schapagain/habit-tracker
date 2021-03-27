import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import { FaCalendarPlus } from "react-icons/fa";
import { RiRepeatOneLine } from "react-icons/ri";
import CalendarIcon from "./CalendarIcon";
import { BsArrowUpDown, BsArrowDown } from "react-icons/bs";
import Button from "./Button";
import MobileNavbar from "./MobileNavbar";

const IntroText = () => {
  return (
    <div>
      <p className="text-4xl mb-4">Keepings habits simple.</p>
      <div className="text-2xl">
        <p>Track your habits,</p>
        <p>block by block.</p>
      </div>
    </div>
  );
};

const Landing = () => {
  const arrowStyles = "m-auto text-2xl text-calypso stroke-1";

  const history = useHistory();
  const goToSignup = () => history.push("/signup");
  const goToHome = () => history.push("/home");
  const goToAddHabit = () => history.push("/addhabit");

  return (
    <div className="h-screen justify-between w-full flex flex-col">
      <NavBar />
      <MobileNavbar />
      <div className="md:flex-row flex flex-col w-full h-2/3 my-auto justify-center">
        <div className="flex my-auto m-3 w-full md:w-1/2 flex-col">
          <IntroText />
          <Button
            className="rounded-full"
            text="Get started"
            onClick={goToSignup}
          />
        </div>
        <div className="m-2 hidden md:flex w-1/2 flex-col">
          <Button
            text="Add a habit"
            className="rounded-full"
            icon={<FaCalendarPlus />}
            onClick={goToAddHabit}
          />
          <BsArrowDown className={arrowStyles} />
          <CalendarIcon />
          <BsArrowUpDown className={arrowStyles} />
          <Button
            className="rounded-full"
            text="Keep at it!"
            icon={<RiRepeatOneLine />}
            onClick={goToHome}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
