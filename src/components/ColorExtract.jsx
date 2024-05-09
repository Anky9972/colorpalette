import React, { useEffect, useState } from 'react';
import { extractColors } from 'extract-colors';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaMinus, FaPlus } from 'react-icons/fa';
import '../slider.css'

const ColorExtract = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [captured,setCaptured] = useState(false);
  const videoRef = React.useRef();
  // console.log('is camerea open',isCameraOpen)

  useEffect(() => {
    if (selectedImage) {
      extractColors(selectedImage)
        .then((colors) => {
          // console.log('Extracted Colors:', colors);
          setExtractedColors(colors);
        })
        .catch((error) => {
          console.error('Error extracting colors:', error);
        });
    }
  }, [selectedImage]);

  function copyColorCode(hexColor) {
    const textToCopy = `HEX: ${hexColor}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`Color copied to clipboard!`);
  }

  // Function to open camera
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Function to close camera
  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      
      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }

    setIsCameraOpen(false);
  };

 // Function to capture photo
const capturePhoto = () => {
  const canvas = document.createElement('canvas');
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  const imageSrc = canvas.toDataURL('image/jpeg');
  setSelectedImage(imageSrc);
  setCaptured(true);
  closeCamera();
};

 
  // Function to retake photo
  const retakePhoto = () => {
    setSelectedImage(null);
    setIsCameraOpen(true);
    // console.log('clicked retake')
  };

  // Function to handle URL input
const handleUrlSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`https://colorpalettebackend.onrender.com/api/v1/image-proxy?imageUrl=${encodeURIComponent(urlInput)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setSelectedImage(imageUrl); 
    setIsUrlMode(false); 
  } catch (error) {
    console.error('Error fetching image:', error);
    
  }
};


  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    }
  });

  return (
    <div className="container mx-auto  p-5 h-full w-full bg-white flex flex-col justify-center items-center gap-3 ">
      {
        selectedImage ? (
          <>
            <span className='absolute top-3 text-xl font-bold'>Image picker</span>
            <div>
              <img src={selectedImage} alt="Selected" className=" w-full h-[250px] m-auto" />
              {captured && (
                <div className="flex justify-center mt-2">
                  <button onClick={retakePhoto} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Retake</button>
                </div>
              )}
              {extractedColors.length > 0 && (
                <div className="">
                  <div className="flex flex-row mt-3 w-full h-24 bg-white justify-center items-center border-b border-t border-solid border-black">
                    {extractedColors.map((color, index) => (
                      <motion.div
                        key={index}
                        className="relative w-full outline-none border-none h-14 border  border-gray-400"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => copyColorCode(color.hex)}
                      >
                       
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 text-white rounded">
                          {color.hex}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className='w-full h-16  flex justify-center items-center bg-white'>
                    <input type="range" min="0" max="11"  className='w-3/4'/>
                    <div className='w-1/4  flex justify-end items-center gap-2'>
                      <button className='w-8 h-8 text-lg border-[0.5px] border-slate-400  bg-white flex justify-center items-center rounded-full'><FaMinus/></button>
                      <button className='w-8 h-8 text-lg border-[0.5px] border-slate-400 mr-1 bg-white flex justify-center items-center rounded-full'><FaPlus/></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )
        :
        (
          <>
          <span className='text-lg font-bold absolute top-3'>Select image</span>
            <div className='w-full h-16 flex justify-center items-center border-b border-t border-solid border-black'>
              <ul className='flex w-4/5 justify-center gap-5'>
                <li onClick={() => { setIsCameraOpen(false); setIsUrlMode(false); }}>
                  <div className="cursor-pointer">
                    Upload
                  </div>
                </li>
                <li onClick={() => { setIsCameraOpen(false); setIsUrlMode(true); }} className="cursor-pointer">URL</li>
                <li onClick={() => { setIsUrlMode(false); openCamera(); }} className="cursor-pointer">Camera</li>
              </ul>
            </div>
            {!isCameraOpen && !isUrlMode && (
              <div {...getRootProps()} className="border border-dashed border-gray-400 h-48 rounded-xl w-full flex justify-center items-center">
                <input {...getInputProps()} />
                <p className="text-gray-600 text-center">Drag 'n' drop an image here, or click to select an image</p>
              </div>
            )}
            {isUrlMode && (
              <>
              <form onSubmit={handleUrlSubmit} className="w-full max-w-sm mt-4">
                <div className="flex items-center border-b  border-teal-500 py-2">
                  <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Enter image URL" aria-label="Full name" />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </form>
              </>
            )}
            <div className="camera" style={{ display: isCameraOpen ? 'block' : 'none' }}>
              <video ref={videoRef} className="w-full h-auto" autoPlay muted></video>
              <div className="flex justify-center mt-2">
                <button onClick={capturePhoto} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Capture</button>
                <button onClick={closeCamera} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close Camera</button>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default ColorExtract;
