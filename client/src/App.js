import "./App.css";
import AppHome from "./components/AppHome.js";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="w-full mx-auto bg-blue-500 flex flex-col bg-spring-rain text-center">
          <AppHome />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
