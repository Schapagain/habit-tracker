import NavBar from './NavBar';
import { useHistory } from 'react-router-dom';
import { FaCalendarPlus } from 'react-icons/fa';
import { RiRepeatOneLine } from 'react-icons/ri';
import CalendarIcon from './CalendarIcon';
import { BsArrowUpDown, BsArrowDown } from 'react-icons/bs';
import Button from './Button';

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

const Landing = () => {
    const arrowStyles = "m-auto text-2xl text-calypso stroke-1";

    const history = useHistory();
    const onButtonClick = () => history.push("/signup");

    return (
        <div className="min-h-screen justify-between flex flex-col">
            <NavBar />
            <div className="flex h-2/3 my-auto justify-center">
                <div className="flex my-auto m-3 w-1/2 flex-col">
                    <IntroText />
                    <Button 
                    className="rounded-full"
                    text="Get started" 
                    onClick={onButtonClick}/>    
                </div>
                <div className="m-2 flex w-1/2 flex-col">
                    <Button 
                    text="Add a habit" 
                    className="rounded-full"
                    icon={<FaCalendarPlus/>} 
                    onClick={onButtonClick}/>
                    <BsArrowDown className={arrowStyles} />
                    <CalendarIcon />
                    <BsArrowUpDown className={arrowStyles} />
                    <Button 
                    className="rounded-full"
                    text="Keep at it!" 
                    icon={<RiRepeatOneLine />}
                    onClick={onButtonClick} />
                </div>
            </div>
        </div>
    )
}

export default Landing;