import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/homePage';
import Movie from './components/oneMovie';
import Actor from './components/oneActor';
import Result from './components/results';

function App() {
  
  return (
    <Router>
      <div>
       <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/actor' element={<Actor />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;