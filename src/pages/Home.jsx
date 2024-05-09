import { NavLink } from 'react-router-dom';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

function Home() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const controls = useAnimation();
  const { scrollYProgress } = useViewportScroll();

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
    const unsubscribe = scrollYProgress.onChange((latest) => {
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
            <NavLink to='/allpalettes'>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2, delay: 2 } }} className='w-60 h-12 rounded-lg text-lg font-bold  bg-white'>Explore Palettes</motion.button>
            </NavLink>
          </div>
        </div>
      </motion.div>
      <div className='hidden md:block second-page w-full h-screen bg-black '>
        <motion.div
          className='w-full h-1/4 absolute md:mt-10 flex justify-center items-center text-white'
          initial={{ x: -200, opacity: 0 }}
          animate={currentPage === 1 ? { x: 0, opacity: 1, transition: { duration: 1, delay: 0.8 } } : {}}
        >
          <h1 className=' text-8xl font-bold '>Explore Palette Features</h1>
        </motion.div>
        <div className='w-full h-full bg-black  flex justify-center items-center '>
          <motion.div
            className='w-4/5 h-4/5 md:mt-10 bg-black  flex justify-around items-center '

          >
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1 } } : {}}
              className='w-1/5 h-1/2 flex flex-col justify-around items-center p-2'>
              <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.2 } } : {}}
              className='text-white h-16 w-full text-2xl flex justify-center font-bold items-center'>
                <span 
                >Generate Palettes</span>
                </motion.h2>
              <p className='w-full h-3/4 text-center rounded-xl bg-slate-200 p-4 text-sm '>
                Instantly create stunning color palettes with just a click. Our intuitive algorithm generates harmonious combinations based on your preferences, giving you endless inspiration for your projects.
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.2 } } : {}}
              className='w-1/5 h-1/2 flex flex-col justify-around items-center p-2'>
              <motion.h2 
              initial={{ y: 100, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.4 } } : {}}
              className='h-16 w-full text-white text-[1.4rem] flex justify-center items-center font-bold'>
                <span>Explore All Palettes</span>
              </motion.h2>
              <p className='w-full  bg-slate-200 h-3/4 text-center rounded-xl p-4 text-sm'>
                Dive into a vast library of curated color palettes from our community of creators. Browse through a diverse range of styles, themes, and moods to find the perfect palette for your next masterpiece.
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.4 } } : {}}
              className='w-1/5 h-1/2  flex flex-col justify-around items-center p-2'>
              <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.6 } } : {}}
              className='h-16 w-full text-2xl text-white flex justify-center font-bold items-center'>
                <span>Gradient Palettes</span>
              </motion.h2>
              <p className='w-full bg-slate-200 h-3/4 text-center rounded-xl p-4 text-sm'>
                Discover the beauty of gradients with our Gradient Palettes feature. Create smooth transitions between colors or experiment with bold contrasts to add depth and dimension to your designs.
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.6 } } : {}}
              className='w-1/5 h-1/2 flex flex-col justify-around items-center p-2'>
              <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={currentPage === 1 ? { y: 0, opacity: 1, transition: { duration: 1, delay: 1.8 } } : {}}
              className='h-16 w-full text-white text-[1.3rem] flex justify-center items-center font-semibold'>
                <span>Adjust Palettes Color</span>
              </motion.h2>
              <p className='w-full bg-slate-200 h-3/4 rounded-xl text-center p-4 text-sm'>
                Customize your color palettes with precision using our advanced color adjustment tools. Fine-tune the hue, saturation, brightness, and more to achieve the perfect look for your project.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
