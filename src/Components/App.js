import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DarkNavbar from './DarkNavbar'
import Menu from './Menu';
import Home from './Home'
import '../Styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <DarkNavbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
