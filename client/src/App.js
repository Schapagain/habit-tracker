import { Container } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppHome from './components/AppHome.js';

function App() {
  return (
    <Container fluid className="App">
      <h1 className="heading p-5"> Habit Tracker</h1>
       <AppHome />
    </Container>
  );
}

export default App;
