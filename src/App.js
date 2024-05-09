import './App.css';
import AllPalettes from './components/Allpalettes';
import Generate from './components/Generate';
import ColorExtract from './components/ColorExtract';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import GradientColor from './components/GradientColor';
import Variation from './components/Variation';
import Auth from './pages/Auth';
function App() {
  return (
    <div className=" h-screen w-full ">
      <Navbar />
      {/* <GradientColor/> */}
      <Auth/>
      <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/allpalettes" element={<AllPalettes />} />
            <Route path="/generate" element={<Generate/>} />
            <Route path='/extract' element={<ColorExtract/>}></Route>
            <Route path='/gradient' element={<GradientColor/>}></Route>
        </Routes>
        
    </div>
  );
}

export default App;
