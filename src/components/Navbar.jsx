// import { NavLink, useLocation, matchPath, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import React, { useContext, useEffect, useState } from "react";
// import { Authentication } from "../context/Authentication";
// import { PiUserCircleThin } from "react-icons/pi";
// import { ColorState } from "../context/ColorState";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { Palette, Images, Contrast, ScanEye, SwatchBook } from "lucide-react";
// import { IoCloseSharp } from "react-icons/io5";
// import { AnimatePresence } from "framer-motion";
// // import Tool from "./Tool";

// function Navbar() {
//   const [letterColors, setLetterColors] = useState([]);
//   const {
//     signin,
//     signup,
//     setSignin,
//     setSignup,
//     isLoggedIn,
//     setIsLoggedIn,
//     removeToken,
//   } = useContext(Authentication);
//   const [toolsModal, setToolsModal] = useState(false);
//   const navigate = useNavigate();

//   const { ismenuopen, setIsMenuOpen } = useContext(ColorState);
//   const location = useLocation();
//   // const isRootPath = location.pathname === "/";
//   // const isResetPasswordPath = matchPath(
//   //   "/reset-password/:token",
//   //   location.pathname
//   // );

//   // Function to generate random letter colors
//   const generateLetterColors = () => {
//     const colors = [];
//     for (let i = 0; i < text.length; i++) {
//       colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
//     }
//     return colors;
//   };

//   useEffect(() => {
//     setLetterColors(generateLetterColors());
//     const interval = setInterval(() => {
//       setLetterColors(generateLetterColors());
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   let text = "Color Palette";
//   text = text.split("");

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem('userId');
//     setIsLoggedIn(false);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!ismenuopen);
//   };

//   return (
//     <>
//       <header className="w-full bg-white border-b border-gray-200">
//         <nav className="w-full h-full p-2 flex justify-center items-center md:justify-around relative">
//           <div className="md:hidden absolute left-5">
//             <button
//               className="w-10 h-10  flex justify-center  items-center text-3xl"
//               onClick={toggleMenu}
//             >
//               <RxHamburgerMenu
//                 className={`${
//                   ismenuopen
//                     ? "rotate-90 duration-500 ease-in-out"
//                     : "rotate-0 duration-500 ease-in-out"
//                 }`}
//               />
//             </button>
//           </div>
//           <div className="lg:w-1/3 flex justify-start items-center">
//             <h1 className="text-3xl font-bold font-[yellowtail]">
//               <NavLink to="/">
//                 {/* {text.map((el, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0 }}
//                     animate={{
//                       opacity: 1,
//                       transition: { duration: 1, delay: i / 10 },
//                     }}
//                     style={{ color: letterColors[i], transition: " 5s all " }}
//                   >
//                     {el.trim()}
//                   </motion.span>
//                 ))} */}
//                 Palettes
//               </NavLink>
//             </h1>
//           </div>

//           <ul
//             className=" hidden md:w-1/2   md:flex justify-end items-center gap-5"
//             onMouseLeave={() => {
//               setToolsModal(false);
//             }}
//           >
//             {toolsModal && (
//               <div className="absolute md:top-14 lg:top-12 md:right-20 lg:right-48 z-50 border bg-white rounded-lg w-[80%] max-w-2xl shadow-md overflow-hidden">
//                 <div className="flex justify-between">
//                   {/* Left Column */}
//                   <div className="flex flex-col w-3/4 p-4">
//                     {/* Palette Generator */}
//                     <div
//                       className="flex items-start space-x-3 p-4 rounded-xl hover:bg-green-100 group"
//                       onClick={() => navigate("/generate")}
//                     >
//                       <div className="text-green-500 text-3xl group-hover:text-green-700 transition-colors duration-200">
//                         <Palette className="mt-1" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-extrabold group-hover:text-green-700 transition-colors duration-200">
//                           Palette Generator
//                         </h3>
//                         <p className="text-gray-600 transition-colors duration-200">
//                           Create your palettes in seconds
//                         </p>
//                       </div>
//                     </div>

//                     {/* Explore Palettes */}
//                     <div
//                       className="flex items-start space-x-3 p-4 rounded-xl hover:bg-pink-100 group"
//                       onClick={() => navigate("/explore")}
//                     >
//                       <div className="text-pink-500 text-3xl group-hover:text-pink-700 transition-colors duration-200">
//                         <SwatchBook className="mt-1" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-extrabold group-hover:text-pink-700 transition-colors duration-200">
//                           Explore Palettes
//                         </h3>
//                         <p className="text-gray-600 transition-colors duration-200">
//                           Browse millions of trending color schemes
//                         </p>
//                       </div>
//                     </div>

//                     {/* Image Picker */}
//                     <div
//                       className="flex items-start space-x-3 p-4 rounded-xl hover:bg-blue-100 group"
//                       onClick={() => navigate("/image-picker")}
//                     >
//                       <div className="text-blue-500 text-3xl group-hover:text-blue-700 transition-colors duration-200">
//                         <Images className="mt-1" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-extrabold group-hover:text-blue-700 transition-colors duration-200">
//                           Image Picker
//                         </h3>
//                         <p className="text-gray-600 transition-colors duration-200">
//                           Get beautiful palettes from your photos
//                         </p>
//                       </div>
//                     </div>

//                     {/* Contrast Checker */}
//                     <div className="flex items-start space-x-3 p-4 rounded-xl hover:bg-yellow-100 group" onClick={()=>navigate("/contrast-checker")}>
//                       <div className="text-yellow-500 text-3xl group-hover:text-yellow-700 transition-colors duration-200">
//                         <Contrast className="mt-1" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-extrabold group-hover:text-yellow-700 transition-colors duration-200">
//                           Contrast Checker
//                         </h3>
//                         <p className="text-gray-600 transition-colors duration-200">
//                           Check the contrast between two colors
//                         </p>
//                       </div>
//                     </div>

//                     {/* Palette Visualizer */}
//                     <div className="flex items-start space-x-3 p-4 rounded-xl hover:bg-purple-100 group">
//                       <div className="text-purple-500 text-3xl group-hover:text-purple-700 transition-colors duration-200">
//                         <ScanEye className="mt-1" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-extrabold group-hover:text-purple-700 transition-colors duration-200">
//                           Palette Visualizer{" "}
//                           <span className="text-purple-500 text-xs bg-purple-100 rounded-full px-2">
//                             NEW
//                           </span>
//                         </h3>
//                         <p className="text-gray-600 transition-colors duration-200">
//                           Preview your colors on real designs
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div className="w-1/3 bg-gray-50 space-y-1 text-sm text-gray-900 p-4">
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/colors")}>
//                       List of colors{" "}
//                       {/* <span className="text-orange-500 text-xs bg-orange-100 rounded-full px-2">
//                         NEW
//                       </span> */}
//                     </p>
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/gradients")}>Browse Gradients</p>
//                     <p className="font-semibold cursor-pointer"  onClick={()=>navigate("/gradient-maker")}>Create a Gradient</p>
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/gradient-palette")}>Make a Gradient Palette</p>
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/gradients")}>Color Picker</p>
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/upcoming")}>Collage Maker</p>
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/upcoming")}>List of Fonts</p>
//                     <p className="font-semibold cursor-pointer" onClick={()=>navigate("/upcoming")}>Image Converter</p>
//                     {/* <h4 className="font-semibold mt-4">APPS</h4>
//             <p>iOS App</p>
//             <p>Android App</p>
//             <p>Figma Plugin</p>
//             <p>Adobe Extension <span className="text-orange-500 text-xs bg-orange-100 rounded-full px-2">NEW</span></p> */}
//                     <p></p>
//                     <p></p>
//                     <p></p>
//                     <p></p>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <>
//               {/* <li><NavLink to='/gradient' className='font-bold border-b border-slate-700'>Gradient</NavLink></li> */}
//               <li
//                 onMouseEnter={() => {
//                   setToolsModal(true);
//                 }}
//                 className="font-bold text-sm border-slate-700"
//               >
//                 Tools
//               </li>
//               {isLoggedIn ? (
//                 <>
//                   <li className="w-10 h-10 hover:bg-slate-200 rounded-full flex justify-center items-center text-3xl">
//                     <PiUserCircleThin />
//                   </li>
//                   <li>
//                     <button
//                       className="w-16 h-10 text-sm font-bold text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <button
//                       className="w-16 h-10 font-bold text-sm border-none outline-none"
//                       onClick={() => {
//                         setSignin(!signin);
//                       }}
//                     >
//                       Sign in
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className="w-16 py-1 font-bold text-sm bg-black rounded-md text-white"
//                       onClick={() => {
//                         setSignup(!signup);
//                       }}
//                     >
//                       Sign up
//                     </button>
//                   </li>
//                 </>
//               )}
//             </>
//           </ul>
//             <AnimatePresence>
//           {ismenuopen && (
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: "0" }}
//               exit={{ x: "-100%" }}
//               transition={{ duration: 0.3,ease: "easeInOut" }}
//               className="w-full h-full bg-black bg-opacity-45 flex justify-start right-0 fixed z-50 top-0 "
//               onClick={() => setIsMenuOpen(!ismenuopen)}
//             >
//               <div className="w-4/5 h-full flex gap-10 bg-white flex-col p-10 relative overflow-auto">
//                 <span
//                   className="absolute right-1 rounded-lg p-1 top-1 flex justify-center items-center cursor-pointer"
//                   onClick={() => setIsMenuOpen(!ismenuopen)}
//                 >
//                   <IoCloseSharp className="text-2xl" />
//                 </span>
//                 <ul className="flex flex-col gap-5">
//                   <li
//                     className="text-2xl text-green-500 font-bold"
//                     onClick={() => navigate("/generate")}
//                   >
//                     Palette Generator
//                   </li>
//                   <li
//                     className="text-2xl text-green-500 font-bold"
//                     onClick={() => navigate("/explore")}
//                   >
//                     Explore Palettes
//                   </li>
//                   <li
//                     className="text-2xl text-green-500 font-bold"
//                     onClick={() => navigate("/image-picker")}
//                   >
//                     Image Picker
//                   </li>
//                   <li className="text-2xl text-green-500 font-bold" onClick={() => navigate("/contrast-checker")}>
//                     Contrast Checker
//                   </li>
//                 </ul>
//                 <h1 className="text-lg font-bold text-gray-500">OTHER TOOLS</h1>
//                 <ul className="flex flex-col gap-5">
//                   <li className="text-2xl font-semibold" onClick={()=>navigate("/colors")}>List of colors</li>
//                   <li className="text-2xl font-semibold" onClick={()=>navigate("/gradients")}>Browse Gradients</li>
//                   <li className="text-2xl font-semibold"  onClick={() => navigate("/upcoming")}>Color Picker</li>
//                   <li className="text-2xl font-semibold"  onClick={() => navigate("/upcoming")}>Collage Maker</li>
//                 </ul>
//                 <h1 className="text-lg font-bold text-gray-500">ACCOUNT</h1>
//                 <ul className="flex flex-col gap-5">
//                   {isLoggedIn ? (
//                     <>
//                       {/* <li className="w-full border-b text-lg  border-slate-200 p-2 flex justify-center items-center">
//                         <PiUserCircleThin />
//                       </li> */}
//                       <li
//                         className="w-full text-2xl font-semibold text-red-500"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </li>
//                     </>
//                   ) : (
//                     <>
//                       <li
//                         className="w-full text-2xl font-semibold"
//                         onClick={() => {
//                           setSignin(!signin);
//                           setIsMenuOpen(!ismenuopen);
//                         }}
//                       >
//                         Sign in
//                       </li>
//                       <li
//                         className="w-full font-semibold text-2xl"
//                         onClick={() => {
//                           setSignup(!signup);
//                           setIsMenuOpen(!ismenuopen);
//                         }}
//                       >
//                         Sign up
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </div>
//             </motion.div>
//           )}
//           </AnimatePresence>
//         </nav>
//         {/* {!isRootPath && !isResetPasswordPath && <Tool />} */}
//       </header>
//     </>
//   );
// }

// export default Navbar;

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Authentication } from "../context/Authentication";
import { ColorState } from "../context/ColorState";
import { PiUserCircleThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { Palette, Images, Contrast, ScanEye, SwatchBook } from "lucide-react";

// Constants
const ROUTES = {
  HOME: "/",
  GENERATE: "/generate",
  EXPLORE: "/explore",
  IMAGE_PICKER: "/image-picker",
  CONTRAST_CHECKER: "/contrast-checker",
  COLORS: "/colors",
  GRADIENTS: "/gradients",
  GRADIENT_MAKER: "/gradient-maker",
  GRADIENT_PALETTE: "/gradient-palette",
  UPCOMING: "/upcoming",
};

const MENU_ITEMS = [
  {
    id: "palette-generator",
    title: "Palette Generator",
    description: "Create your palettes in seconds",
    icon: Palette,
    route: ROUTES.GENERATE,
    colorClass: {
      hover: "hover:bg-green-100",
      text: "text-green-500",
      hoverText: "group-hover:text-green-700",
    },
  },
  {
    id: "explore-palettes",
    title: "Explore Palettes",
    description: "Browse millions of trending color schemes",
    icon: SwatchBook,
    route: ROUTES.EXPLORE,
    colorClass: {
      hover: "hover:bg-pink-100",
      text: "text-pink-500",
      hoverText: "group-hover:text-pink-700",
    },
  },
  {
    id: "image-picker",
    title: "Image Picker",
    description: "Get beautiful palettes from your photos",
    icon: Images,
    route: ROUTES.IMAGE_PICKER,
    colorClass: {
      hover: "hover:bg-blue-100",
      text: "text-blue-500",
      hoverText: "group-hover:text-blue-700",
    },
  },
  {
    id: "contrast-checker",
    title: "Contrast Checker",
    description: "Check the contrast between two colors",
    icon: Contrast,
    route: ROUTES.CONTRAST_CHECKER,
    colorClass: {
      hover: "hover:bg-yellow-100",
      text: "text-yellow-500",
      hoverText: "group-hover:text-yellow-700",
    },
  },
  {
    id: "palette-visualizer",
    title: "Palette Visualizer",
    description: "Preview your colors on real designs",
    icon: ScanEye,
    route: ROUTES.UPCOMING,
    colorClass: {
      hover: "hover:bg-purple-100",
      text: "text-purple-500",
      hoverText: "group-hover:text-purple-700",
    },
    isNew: true,
  },
];

const SIDE_TOOLS = [
  { id: "colors", title: "List of colors", route: ROUTES.COLORS },
  { id: "gradients", title: "Browse Gradients", route: ROUTES.GRADIENTS },
  { id: "gradient-maker", title: "Create a Gradient", route: ROUTES.GRADIENT_MAKER },
  { id: "gradient-palette", title: "Make a Gradient Palette", route: ROUTES.GRADIENT_PALETTE },
  { id: "color-picker", title: "Color Picker", route: ROUTES.UPCOMING },
  { id: "collage-maker", title: "Collage Maker", route: ROUTES.UPCOMING },
  { id: "fonts", title: "List of Fonts", route: ROUTES.UPCOMING },
  { id: "image-converter", title: "Image Converter", route: ROUTES.UPCOMING },
];

// Components
const MenuItem = ({ item, onClick }) => (
  <div
    className={`flex items-start space-x-3 p-4 rounded-xl ${item.colorClass.hover} group cursor-pointer`}
    onClick={() => onClick(item.route)}
    role="button"
    tabIndex={0}
    aria-label={item.title}
  >
    <div className={`${item.colorClass.text} text-3xl ${item.colorClass.hoverText} transition-colors duration-200`}>
      <item.icon className="mt-1" />
    </div>
    <div>
      <h3 className={`text-2xl font-extrabold ${item.colorClass.hoverText} transition-colors duration-200`}>
        {item.title}
        {item.isNew && (
          <span className={`${item.colorClass.text} text-xs bg-purple-100 rounded-full px-2 ml-2`}>
            NEW
          </span>
        )}
      </h3>
      <p className="text-gray-600 transition-colors duration-200">{item.description}</p>
    </div>
  </div>
);

const ToolsModal = ({ onMouseLeave, onNavigate }) => (
  <div
    className="absolute md:top-14 lg:top-12 md:right-20 lg:right-48 z-50 border bg-white rounded-lg w-[80%] max-w-2xl shadow-md overflow-hidden"
    onMouseLeave={onMouseLeave}
    role="dialog"
    aria-label="Tools menu"
  >
    <div className="flex justify-between">
      <div className="flex flex-col w-3/4 p-4">
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.id} item={item} onClick={onNavigate} />
        ))}
      </div>
      <div className="w-1/3 bg-gray-50 space-y-1 text-sm text-gray-900 p-4">
        {SIDE_TOOLS.map((tool) => (
          <p
            key={tool.id}
            className="font-semibold cursor-pointer hover:text-gray-700 transition-colors duration-200"
            onClick={() => onNavigate(tool.route)}
            role="button"
            tabIndex={0}
          >
            {tool.title}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const MobileMenu = ({ isOpen, onClose, isLoggedIn, onLogout, onSignIn, onSignUp, onNavigate }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-full bg-black bg-opacity-45 flex justify-start right-0 fixed z-50 top-0"
        onClick={onClose}
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="w-4/5 h-full flex gap-10 bg-white flex-col p-10 relative overflow-auto">
          <button
            className="absolute right-1 rounded-lg p-1 top-1 flex justify-center items-center cursor-pointer"
            onClick={onClose}
            aria-label="Close menu"
          >
            <IoCloseSharp className="text-2xl" />
          </button>

          <ul className="flex flex-col gap-5">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.id}
                className="text-2xl text-green-500 font-bold cursor-pointer"
                onClick={() => {
                  onNavigate(item.route);
                  onClose();
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>

          <h1 className="text-lg font-bold text-gray-500">OTHER TOOLS</h1>
          <ul className="flex flex-col gap-5">
            {SIDE_TOOLS.slice(0, 4).map((tool) => (
              <li
                key={tool.id}
                className="text-2xl font-semibold cursor-pointer"
                onClick={() => {
                  onNavigate(tool.route);
                  onClose();
                }}
              >
                {tool.title}
              </li>
            ))}
          </ul>

          <h1 className="text-lg font-bold text-gray-500">ACCOUNT</h1>
          <ul className="flex flex-col gap-5">
            {isLoggedIn ? (
              <li
                className="w-full text-2xl font-semibold text-red-500 cursor-pointer"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                Logout
              </li>
            ) : (
              <>
                <li
                  className="w-full text-2xl font-semibold cursor-pointer"
                  onClick={() => {
                    onSignIn();
                    onClose();
                  }}
                >
                  Sign in
                </li>
                <li
                  className="w-full font-semibold text-2xl cursor-pointer"
                  onClick={() => {
                    onSignUp();
                    onClose();
                  }}
                >
                  Sign up
                </li>
              </>
            )}
          </ul>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Main Component
function Navbar() {
  const [toolsModal, setToolsModal] = useState(false);
  const navigate = useNavigate();
  const {
    signin,
    signup,
    setSignin,
    setSignup,
    isLoggedIn,
    setIsLoggedIn,
    removeToken,
  } = useContext(Authentication);
  const { ismenuopen, setIsMenuOpen } = useContext(ColorState);

  const handleLogout = useCallback(() => {
    removeToken();
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  }, [removeToken, setIsLoggedIn]);

  const handleNavigation = useCallback((route) => {
    navigate(route);
    setToolsModal(false);
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!ismenuopen);
  }, [ismenuopen, setIsMenuOpen]);

  // Handle escape key for modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setToolsModal(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [setIsMenuOpen]);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <nav className="w-full h-full p-2 flex justify-center items-center md:justify-around relative">
        <div className="md:hidden absolute left-5">
          <button
            className="w-10 h-10 flex justify-center items-center text-3xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <RxHamburgerMenu
              className={`${
                ismenuopen
                  ? "rotate-90 duration-500 ease-in-out"
                  : "rotate-0 duration-500 ease-in-out"
              }`}
            />
          </button>
        </div>

        <div className="lg:w-1/3 flex justify-start items-center">
          <h1 className="text-3xl font-bold font-[yellowtail]">
            <NavLink to="/">Palettes</NavLink>
          </h1>
        </div>

        <ul
          className="hidden md:w-1/2 md:flex justify-end items-center gap-5"
          onMouseLeave={() => setToolsModal(false)}
        >
          {toolsModal && (
            <ToolsModal
              onMouseLeave={() => setToolsModal(false)}
              onNavigate={handleNavigation}
            />
          )}
          <li
            onMouseEnter={() => setToolsModal(true)}
            className="font-bold text-sm border-slate-700 cursor-pointer"
            role="button"
            tabIndex={0}
          >
            Tools
          </li>

          {isLoggedIn ? (
            <>
              <li className="w-10 h-10 hover:bg-slate-200 rounded-full flex justify-center items-center text-3xl">
                <PiUserCircleThin aria-label="User profile" />
              </li>
              <li>
                <button
                  className="w-16 h-10 text-sm font-bold text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="w-16 h-10 font-bold text-sm border-none outline-none"
                  onClick={() => setSignin(!signin)}
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  className="w-16 py-1 font-bold text-sm bg-black rounded-md text-white"
                  onClick={() => setSignup(!signup)}
                >
                  Sign up
                </button>
              </li>
            </>
          )}
        </ul>

        <MobileMenu
          isOpen={ismenuopen}
          onClose={toggleMenu}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onSignIn={() => setSignin(!signin)}
          onSignUp={() => setSignup(!signup)}
          onNavigate={handleNavigation}
        />
      </nav>
    </header>
  );
}

export default Navbar;