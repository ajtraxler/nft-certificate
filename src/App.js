import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CertForm from './pages/CertForm';
import Minting from './pages/Minting';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CertForm />} />
        <Route path="/minting" element={<Minting />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
