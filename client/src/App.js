import './App.css';
import AppHome from './components/AppHome.js';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
library.add(faCalendarPlus);


function App() {
  return (
    <div className="min-w-min-lg h-screen mx-auto overflow-x-hidden max-w-screen-xl flex flex-col text-center justify-between bg-indigo-400 min-h-screen">
      <AppHome />
      <h6>This is a crazy footer</h6>
    </div>
  );
}

export default App;