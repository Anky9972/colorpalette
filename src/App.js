import "./App.css";
import AllPalettes from "./components/Allpalettes";
import Generate from "./components/Generate";
import ColorExtract from "./components/ColorExtract";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import GradientColor from "./components/GradientColor";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ImagePicker from "./components/ImagePicker";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ColorContrastChecker from "./components/tools/ColorContrastChecker";
import Footer from "./components/Footer";
import Colors from "./components/tools/Colors";
import GradientPalette from "./components/tools/Gradients";
import CollageMaker from "./components/collage-maker/CollageMaker";
import ComingSoon from "./pages/ComingSoon";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div className=" h-screen w-full ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Auth />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<AllPalettes />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/extract" element={<ColorExtract />}></Route>
            <Route path="/gradient" element={<GradientColor />}></Route>
            <Route path="/image-picker" element={<ImagePicker />}></Route>
            <Route path="/forgot" element={<ForgotPassword />}></Route>
            <Route path="/contrast-checker" element={<ColorContrastChecker />}></Route>
            <Route path="/colors" element={<Colors />}></Route>
            <Route path="/gradients" element={<GradientPalette />}></Route>
            <Route path="/collage-maker" element={<CollageMaker />}></Route>
            <Route path="/upcoming" element={<ComingSoon />}></Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
          </Routes>
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
