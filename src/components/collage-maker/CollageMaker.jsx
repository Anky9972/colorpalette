import React, { useState } from 'react';
import ImageModal from './ImageModal';
import CollagePreview from './CollagePreview';
import PalettePicker from './PalletePicker';
// import PalettePicker from './PalettePicker';
// import CollagePreview from './CollagePreview';

const CollageMaker = () => {
  const [palette, setPalette] = useState([]);
  const [image, setImage] = useState(null);
  const [layout, setLayout] = useState('stripes'); // Default layout
  const [aspectRatio, setAspectRatio] = useState('square'); // Default aspect ratio
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Collage Maker</h1>
      <p className="text-gray-500 mb-6">
        Choose between many different styles to create beautiful collages of photo + palette.
      </p>

      {/* Palette and Settings */}
      {/* <div className="flex justify-around">
        <PalettePicker palette={palette} setPalette={setPalette} />

        <div>
          <label>Layout</label>
          <select onChange={(e) => setLayout(e.target.value)} className="block w-full p-2 mt-1 border">
            <option value="stripes">Stripes</option>
            <option value="grid">Grid</option>
          </select>

          <label>Aspect Ratio</label>
          <select onChange={(e) => setAspectRatio(e.target.value)} className="block w-full p-2 mt-1 border">
            <option value="square">Square</option>
            <option value="rectangle">Rectangle</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Browse Image
          </button>
          <button
            onClick={() => console.log("Download Collage")}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
            Download Collage
          </button>
        </div>
      </div> */}
      <div>
      <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-600 text-white py-1 px-4 rounded-lg">
            Browse Image
          </button>
        
      </div>

      {isModalOpen && (
        <ImageModal onClose={() => setIsModalOpen(false)} onImageSelect={handleImageUpload} />
      )}
    </div>
  );
};

export default CollageMaker;
