import React from "react";
import { HashRouter, Routes,Route } from "react-router-dom";
import Home from "./product2/homepage";
// import Category1 from "./cataApi/category1";
 import Catagory from "./cataApi/catagory";
 import Productpage from "./cataApi/product";
 import EditProduct from "./cataApi/edit";
 import Editcat from "./cataApi/edit1";

 


function App() {
  return (
    <HashRouter>
          <Routes> 
         
          <Route exact path="/" element={ <Home/> } /> 
           <Route exact path="/cataApi/catagory" element={ <Catagory/> } />
          {/* <Route exact path="/cataApi/category1" element={ <Category1/> } />  */}
          <Route exact path="/cataApi/product" element={ <Productpage/> } />
          <Route exact path="/cataApi/edit" element={ <EditProduct/> } />
          <Route exact path="/cataApi/edit1" element={ <Editcat/> } />
          
        </Routes>
       </HashRouter>

        

   
  );
}

export default App;
