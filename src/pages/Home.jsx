import { NavLink } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Features from './Features';

function Home() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  const colors = useMemo(() => ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [colors]);

  useEffect(() => {
    const animateColorChange = async () => {
      await controls.start({
        backgroundImage: `linear-gradient(to bottom right, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`,
        transition: { duration: 5, ease: "linear" }
      });
    };

    animateColorChange();

    return () => {
      controls.stop();
    };
  }, [colors, currentColorIndex, controls]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change",(latest) => {
      if (latest >= 0.5) {
        setCurrentPage(1);
      } else {
        setCurrentPage(0);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className='flex flex-col'>
      <motion.div
        className='px-2 h-screen w-full flex justify-center items-center'
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`
        }}
        animate={controls}
      >
        <div className='w-full h-full flex flex-col justify-center items-center gap-14'>
          <div className='text-4xl md:text-7xl flex justify-center '>
            <div className='w-full text-center leading-tight tracking-wide text-[#e9dfce] '>
              <motion.p initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 2, delay: 1 } }} className='font-[] font-extrabold'>Transform your creativity with a </motion.p>
              <motion.p initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 2, delay: 1.3 } }} 
              className='font-extrabold'>splash of <span className='font-light font-[yellowtail]'>colors</span>. Welcome to </motion.p>
              <motion.p initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 2, delay: 1.6 } }} className='font-extrabold'>Palette Generator!</motion.p>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <NavLink to='/generate'>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2, delay: 1.5 } }} className=' w-60 h-12 rounded-lg text-lg font-bold  bg-white'>Generate Palettes</motion.button>
            </NavLink>
            <NavLink to='/explore'>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2, delay: 2 } }} className='w-60 h-12 rounded-lg text-lg font-bold  bg-white'>Explore Palettes</motion.button>
            </NavLink>
          </div>
        </div>
      </motion.div>
      <Features currentPage={currentPage}/>
      
    </div>
  );
}

export default Home;
