import { Route, BrowserRouter, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Create from './front/Create';
import Update from './front/Update';
import Delete from './front/Delete'
import Read from './front/Read';
import MenuBar from './front/MenuBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <MenuBar/>
      <Routes>     
          <Route path="/Create" element={<Create/>}/>
          <Route path="/Read" element={<Read/>}/>
          <Route path="/Update" element={<Update/>}/>
          <Route path="/Delete" element={<Delete/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Create/> */}
    </div>
  );
}

export default App;
