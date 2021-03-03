import NavBar from './NavBar';
import { useHistory } from 'react-router-dom';
import { FaCalendarPlus } from 'react-icons/fa';
import { RiRepeatOneLine } from 'react-icons/ri';

const IntroText = () => {
    return(
        <div>
            <p>Keepings habits simple.</p>
            <p>Track your habits,</p>
            <p>block by block.</p>
        </div>
    )
}

const Button = ({text,icon}) => {
    const history = useHistory();
    const goToSignup = () => history.push("/signup");
    return (
        <a 
        className = "flex bg-gray-300 text-white bg-gray-600 hover: rounded-xl p-2 mx-auto m-2"
        href = "!#" 
        onClick={(e)=>{e.preventDefault();goToSignup()}} 
        >
            {icon && <p className="mx-2 my-auto">{icon}</p>}<p>{text}</p>
        </a>
    )
}

const Landing = () => {
    return (
        <div className="min-h-screen justify-between flex flex-col bg-indigo-500">
            <NavBar />
            <div className="flex my-auto justify-center">
                <div className="flex m-3 flex-col">
                    <IntroText />
                    <Button text="Get started" />    
                </div>    
                <div className="m-2 flex flex-col">
                    <Button text="Add a habit" icon={<FaCalendarPlus/>} />
                    This will have pictures later
                    <Button text="Keep at it!" icon={<RiRepeatOneLine />} />
                </div>
            </div>
            
            
        </div>
    )
}

export default Landing;