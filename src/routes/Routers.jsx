import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import FormCV from "../Pages/FormCV";
import Pdf from "../Pages/Visualizacion_Cv";

const Routers = () => { 
  return ( 
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormCV />} />
      <Route path="/pdf" element={<Pdf />} />
    </Routes>
  );
}; 

export default Routers;
