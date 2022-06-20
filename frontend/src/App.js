import "./styles/index.css";
import 'antd/dist/antd.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './componenets/Header';
import Home from "./componenets/Home";
import Project from "./componenets/Project";


function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/projects/:id' element={<Project/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
