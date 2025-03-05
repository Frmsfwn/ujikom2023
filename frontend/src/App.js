import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaslonList from "./components/Homepage.js";
import AddPaslon from "./components/AddPaslon.js";
import EditPaslon from "./components/EditPaslon.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaslonList/>}/>
        <Route path="/data/paslon/create" element={<AddPaslon/>}/>
        <Route path="/data/paslon/edit/:id" element={<EditPaslon/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
