import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home"
import "./style.scss"
import Single from "./Single";
import Cart from "./Cart";
import Admin from "./Admin"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Register/>}/>
        <Route path="/main" element={<Home />} />
        <Route path="/single/:id" element={<Single/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={ <Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
