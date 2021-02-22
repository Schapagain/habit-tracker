import { Container } from 'reactstrap';
import './App.css';
import Home from './components/Home.js';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Container className="App">
      <h1 className="heading"> Habit Tracker</h1>
       <Home/>
    </Container>
      

  );
}

export default App;
