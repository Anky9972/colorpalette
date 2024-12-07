import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import AllPalettes from "./components/Allpalettes";
import Generate from "./components/Generate";
import ColorExtract from "./components/ColorExtract";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GradientColor from "./components/GradientColor";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ImagePicker from "./components/ImagePicker";
import Loader from "./components/Loader";
import ColorContrastChecker from "./components/tools/ColorContrastChecker";
import Footer from "./components/Footer";
import Colors from "./components/tools/Colors";
import GradientPalette from "./components/tools/Gradients";
import CollageMaker from "./components/collage-maker/CollageMaker";
import ComingSoon from "./pages/ComingSoon";
import ImageConverter from "./components/tools/ImageConverter";
import GradientMaker from "./components/tools/GradientMaker";
import CreateGradient from "./components/tools/CreateGradient";
import ExploreGradientPalettes from "./components/tools/ExploreGradientPalattes";
import ColorPickerMain from "./components/tools/ColorPickerMain";
import ContactPage from "./pages/Contact";
import LegalPages from "./pages/LegalPage";

function App() {
  const { TermsOfService, PrivacyPolicy } = LegalPages;
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Show or hide the footer based on the current route
  const showFooter = !["/generate", "/auth", "/reset-password"].includes(location.pathname);

  // Loader effect on initial page load
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="h-screen w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Navbar is visible on all pages except Auth */}
          {location.pathname !== "/auth" && <Navbar />}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<AllPalettes />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/extract" element={<ColorExtract />} />
            <Route path="/gradient-generate" element={<GradientColor />} />
            {/* <Route path="/image-picker" element={<ImagePicker />} /> */}
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/contrast-checker" element={<ColorContrastChecker />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/gradients" element={<GradientPalette />} />
            <Route path="/collage-maker" element={<CollageMaker />} />
            <Route path="/upcoming" element={<ComingSoon />} />
            <Route path="/image-convert" element={<ImageConverter />} />
            <Route path="/gradient-maker" element={<GradientMaker />} />
            <Route path="/gradient-palette" element={<CreateGradient/>} />
            <Route path="/explore/gradient" element={<ExploreGradientPalettes/>} />
            <Route path="/color-picker" element={<ColorPickerMain/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/terms" element={<TermsOfService/>} />
            <Route path="/privacy" element={<PrivacyPolicy/>} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
          <Auth/>
          {showFooter && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
