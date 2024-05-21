import { NavLink, useLocation ,matchPath} from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { Authentication } from '../context/Authentication';
import { PiUserCircleThin } from 'react-icons/pi';
import { ColorState } from '../context/ColorState';
import { RxHamburgerMenu } from 'react-icons/rx';
import Tool from './Tool';

function Navbar() {
  const [letterColors, setLetterColors] = useState([]);
  const { setSignin, setSignup, isLoggedIn, setIsLoggedIn, removeToken } = useContext(Authentication);
  
  const { ismenuopen, setIsMenuOpen } = useContext(ColorState);
  const location = useLocation();
  const isRootPath = location.pathname === '/';
  const isResetPasswordPath = matchPath('/reset-password/:token', location.pathname);

  // Function to generate random letter colors
  const generateLetterColors = () => {
    const colors = [];
    for (let i = 0; i < text.length; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  };

  useEffect(() => {
    
    setLetterColors(generateLetterColors());
    const interval = setInterval(() => {
      setLetterColors(generateLetterColors());
    }, 5000);

    return () => clearInterval(interval); 
  }, []); 

  let text = 'Color Palette';
  text = text.split('');

  const handleLogout = () => {
    
    removeToken();
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!ismenuopen);
  };

  return (
    <>
      <header className='w-full fixed top-0 z-20  h-[70px] bg-white border-b border-black'>
        <nav className="w-full h-full flex justify-around">
          <div className="w-1/3 flex justify-start items-center">
            <h1 className="text-3xl font-extrabold">
              <NavLink to='/'>
                {text.map((el, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1, delay: i / 10 } }}
                    style={{ color: letterColors[i], transition: ' 5s all ' }}
                  >
                    {el.trim()}
                  </motion.span>
                ))}
              </NavLink>
            </h1>
          </div>
          <ul className=' hidden md:w-1/2   md:flex justify-end items-center gap-6'>
            <>
              <li><NavLink to='/gradient' className='font-bold border-b border-slate-700'>Gradient</NavLink></li>
              {isLoggedIn ? (
                <>
                  <li className='w-10 h-10 hover:bg-slate-200 rounded-full flex justify-center items-center text-3xl'><PiUserCircleThin /></li>
                  <li><button className='w-24 h-10 rounded-md bg-black text-white' onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><button className='w-24 h-10 rounded-md bg-slate-200' onClick={() => { setSignin(true) }}>Sign in</button></li>
                  <li><button className='w-24 h-10 rounded-md bg-black text-white' onClick={() => { setSignup(true) }}>Sign up</button></li>
                </>
              )}
            </>

          </ul>
          {ismenuopen && (
            <div className='w-1/2 right-0 b h-1/2 fixed  z-50  top-[69px] '>
              <ul className=' md:w-1/2 flex bg-white h-3/5 flex-col justify-center items-center '>
                <>
                  <li className='w-full border-b text-3xl border-slate-400 font-bold  h-20 flex justify-center items-center'><NavLink to='/gradient' onClick={() => { setIsMenuOpen(false) }}>Gradient</NavLink></li>
                  {isLoggedIn ? (
                    <>
                      <li className='w-full border-b text-5xl border-slate-400  h-20 flex justify-center items-center'><PiUserCircleThin /></li>
                      <li className='w-full  text-3xl font-bold  h-20 flex justify-center items-center'><button className='w-full h-full' onClick={handleLogout}>Logout</button></li>
                    </>
                  ) : (
                    <>
                      <li className='w-full border-b text-3xl font-bold border-slate-400  h-20 flex justify-center items-center'><button className='w-full h-full' onClick={() => { setSignin(true); setIsMenuOpen(false) }}>Sign in</button></li>
                      <li className='w-full   h-20 font-bold text-3xl flex justify-center items-center'><button className='w-full h-full ' onClick={() => { setSignup(true); setIsMenuOpen(false) }}>Sign up</button></li>
                    </>
                  )}
                </>

              </ul>
            </div>
          )}

          <div className='md:hidden mt-4 ml-24 right-0'>
            <button className='w-10 h-10  flex justify-center  items-center text-3xl' onClick={toggleMenu}>
              <RxHamburgerMenu className={`${ismenuopen ? 'rotate-90 duration-500 ease-in-out' : 'rotate-0 duration-500 ease-in-out'}`} />
            </button>
          </div>

        </nav>
        {!isRootPath && !isResetPasswordPath &&<Tool />}
        
      </header>
    </>
  );
}

export default Navbar;
