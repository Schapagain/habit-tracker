import './App.css';
import AppHome from './components/AppHome.js';
import {BrowserRouter as Router} from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="min-w-min-lg min-h-screen mx-auto max-w-screen-xl flex flex-col text-center justify-between bg-indigo-900">
          <AppHome/>
        </div>  
      </Router>  
    </GlobalProvider>
  );
}

export default App;