import NavBar from "./NavBar";
import HabitList from "./HabitList";
import MobileNavbar from "./MobileNavbar";

const Home = () => {
  return (
    <div className="min-h-screen justify-center flex flex-col">
      <NavBar />
      <MobileNavbar />
      <HabitList />
    </div>
  );
};

export default Home;
