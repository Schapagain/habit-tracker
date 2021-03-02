
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1 className="m-2">This is the Landing.</h1>
            <Link className="bg-gray-200 p-2 mt-4 rounded-lg hover:text-white hover:bg-gray-700"  to="/home" >Go to Home</Link>
        </div>
    )
}

export default Landing;