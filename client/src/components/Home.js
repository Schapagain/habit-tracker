import NavBar from './NavBar';
import HabitList from './HabitList';

const Home = () => {

    return (
        <div className="min-h-screen justify-center flex flex-col">
            <NavBar />
            <HabitList />
        </div>
    )
}

export default Home;