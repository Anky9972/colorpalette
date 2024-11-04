import React from 'react';

const PalettePicker = ({ palette, setPalette }) => {
  return (
    <div className="border p-4">
      <h3 className="font-semibold mb-2">Picked Palettes</h3>
      <input
        type="color"
        value={palette[0] || '#000000'}
        onChange={(e) => setPalette([e.target.value, ...palette.slice(1)])}
        className="block mb-2"
      />
      <button
        onClick={() => setPalette([...palette, '#FFFFFF'])}
        className="bg-gray-200 py-1 px-2 rounded mt-2">
        Add Color
      </button>
    </div>
  );
};

export default PalettePicker;
