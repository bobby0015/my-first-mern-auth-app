import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Notfound from "./components/pages/Notfound";
import Refreshandler from "./utils/Refreshandler";


function App() {
  
  const [isAuthenticated, setisAuthenticated] = useState(false);
  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <Router>
        <Refreshandler setisAuthenticated={setisAuthenticated} />
        <Navbar setisAuthenticated={setisAuthenticated}/>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/about" exact element={<PrivateRoute element={<About />} />} />
          <Route path="/services" exact element={<PrivateRoute element={<Services />} />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="*" exact element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
