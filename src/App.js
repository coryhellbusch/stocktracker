import './App.css';
import PositionsComponent from './Components/PositionsComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewPositionComponent from "./Components/NewPositionComponent";

function App() {
  return (
      <>
          <BrowserRouter>
            <Routes>
                <Route path='/' element={ <PositionsComponent /> }></Route>
                <Route path='/new-position' element={ <NewPositionComponent />}></Route>
                <Route path='/update-position/:id' element={<NewPositionComponent />}></Route>
            </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
