import BackButton from "./BackButton";
import NavBar from "./NavBar";
import Panel from "./Panel";

const Features = () => {
    return (
        <div className="min-h-screen justify-center flex flex-col">
            <NavBar />
            <div className="flex h-screen w-full justify-center m-auto">
                <BackButton
                className="my-auto mr-3 hover:-translate-x-1" 
                />
                <Panel 
                className = "w-full"
                content={<FeaturesText/>} 
                />
            </div>
        </div>
    )
}

const FeaturesText = () => {
    return(
        <div className="text-white p-5">
            <p className="text-xl p-3">With this application you can:</p>
            <ol className="list-disc list-inside">
                <li>
                    Mark calendars for multiple habits simultaneously
                </li>
                <li>
                    Add daily reflections to each habit
                </li>
            </ol> 
        </div>
        
    )
}

export default Features;