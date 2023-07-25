import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home'
import Cart from './Components/Cart'

function App() {
  return (
    <div className="App">
      <Header/>
      
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/cart' element={<Cart/>}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
