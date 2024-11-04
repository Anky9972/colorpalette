import React from 'react';

const CollagePreview = ({ image, palette, layout, aspectRatio }) => {
  return (
    <div className="border p-4 mt-4">
      <h3 className="font-semibold mb-2">Preview</h3>
      <div className={`collage-preview ${layout} ${aspectRatio}`}>
        <img src={image} alt="Selected" className="w-full h-full object-cover" />
        <div className="palette">
          {palette.map((color, idx) => (
            <div key={idx} style={{ backgroundColor: color }} className="palette-color w-16 h-16"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollagePreview;
