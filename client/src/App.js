import './App.css';
import AppHome from './components/AppHome.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="min-w-min-lg min-h-screen mx-auto bg-spring-rain flex flex-col text-center">
          <AppHome/>
        </div>  
      </Router>  
    </GlobalProvider>
  );
}

export default App;