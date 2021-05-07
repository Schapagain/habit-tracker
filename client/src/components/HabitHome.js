import NavBar from "./NavBar";
import BlockList from "./BlockList";
import MobileNavbar from "./MobileNavbar";
import HabitInsights from "./HabitInsights";
export default function HabitHome({ match }) {
  return (
    <div className="min-h-screen justify-center flex flex-col">
      <NavBar />
      <MobileNavbar />
      <BlockList habitId={match.params?.id} />
      <HabitInsights habitId={match.params?.id} />
    </div>
  );
}
