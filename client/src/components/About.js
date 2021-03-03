import BackButton from "./BackButton";
import NavBar from "./NavBar";
import Panel from "./Panel";

const About = () => {
    return (
        <div className="min-h-screen justify-center flex flex-col">
        <NavBar />
        <div className="flex h-screen w-full justify-center m-auto">
            <BackButton
            className="my-auto mr-3 hover:-translate-x-1" 
            />
            <Panel 
            className = "w-full"
            content={<AboutText/>} 
            />
        </div>
    </div>
    )
}

const AboutText = () => {
    return(
        <p className="text-white p-5">
                This is a simple application to help you track your habits on a daily basis.<br/>
                Taste the cumulative effects of being aware of your day-to-day actions.
        </p>
    )
}

export default About;