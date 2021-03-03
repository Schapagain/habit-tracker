import NavBar from './NavBar';
import { useHistory } from 'react-router-dom';
import { FaCalendarPlus } from 'react-icons/fa';
import { RiRepeatOneLine } from 'react-icons/ri';
import CalendarIcon from './CalendarIcon';
import { BsArrowUpDown, BsArrowDown } from 'react-icons/bs';

const IntroText = () => {
    return(
        <div>
            <p className="text-4xl mb-4">Keepings habits simple.</p>
            <div className="text-2xl">
                <p>Track your habits,</p>
                <p>block by block.</p>    
            </div>
        </div>
    )
}

const Button = ({text,icon}) => {
    const history = useHistory();
    const goToSignup = () => history.push("/signup");
    return (
        <a 
        className = {`flex bg-gray-300 text-white bg-gray-600
        hover:bg-calypso hover:animate-bounce rounded-xl p-3 mx-auto m-3
        transition duration-500 transform ease-in-out hover:scale-110
        box-shadow hover:shadow-2xl`}
        href = "!#" 
        onClick={(e)=>{e.preventDefault();goToSignup()}} 
        >
            {icon && <p className="mx-2 my-auto">{icon}</p>}<p>{text}</p>
        </a>
    )
}

const Landing = () => {
    const arrowStyles = "m-auto text-2xl text-calypso";
    return (
        <div className="min-h-screen justify-between flex flex-col">
            <NavBar />
            <div className="flex h-2/3 my-auto justify-center">
                <div className="flex my-auto m-3 w-1/2 flex-col">
                    <IntroText />
                    <Button text="Get started" />    
                </div>
                <div className="m-2 flex w-1/2 flex-col">
                    <Button text="Add a habit" icon={<FaCalendarPlus/>} />
                    <BsArrowDown className={arrowStyles} />
                    <CalendarIcon />
                    <BsArrowUpDown className={arrowStyles} />
                    <Button text="Keep at it!" icon={<RiRepeatOneLine />} />
                </div>
            </div>
        </div>
    )
}

export default Landing;