import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import {
  FaImage,
  FaDownload,
  FaPlus,
  FaMinus,
  FaRegHeart,
} from "react-icons/fa";
import { ChevronDown} from "lucide-react";
import { RiCollageLine } from "react-icons/ri";
import img from "../assets/default.jpg";
import { VscWand } from "react-icons/vsc";
import { CiLink } from "react-icons/ci";
import { GoEye } from "react-icons/go";
import { BiFullscreen } from "react-icons/bi";

const ImagePicker = () => {
  const [image, setImage] = useState(img);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [paletteSize, setPaletteSize] = useState(5);
  const [circles, setCircles] = useState([]); 
  const [pickedPalette, setPickedPalette] = useState([]); 
  const [more, setMore] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getColors = (extractedColors) => {
    setColors(extractedColors);
    setPickedPalette(extractedColors.slice(0, paletteSize)); 
    setSelectedColors(extractedColors.slice(0, paletteSize)); 
    setRandomCircles(extractedColors.slice(0, paletteSize)); 
  };

  const setRandomCircles = (extractedColors) => {
    const newCircles = Array.from({ length: paletteSize }, () => ({
      x: Math.floor(Math.random() * 250), 
      y: Math.floor(Math.random() * 250), 
    }));
    setCircles(newCircles);

    const colorsAtPositions = newCircles.map((circle) => {
      return getColorAtPosition(circle.x, circle.y, image);
    });
    setSelectedColors(colorsAtPositions);
  };

  const getColorAtPosition = (x, y, imgSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imgElement = new Image();

    imgElement.src = imgSrc;
    ctx.drawImage(imgElement, 0, 0);

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    return `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${
      pixelData[3] / 255
    })`;
  };

  const toggleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const updateCircleColor = (index, x, y) => {
    const color = getColorAtPosition(x, y, image);
    setSelectedColors((prev) => {
      const newColors = [...prev];
      newColors[index] = color; 
      return newColors;
    });
  };

  const exportPalette = () => {
    const colorPalette = pickedPalette.join(", ");
    const blob = new Blob([colorPalette], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "palette.txt";
    link.href = url;
    link.click();
  };

  const increasePaletteSize = () => {
    if (paletteSize < 10) {
      setPaletteSize((prevSize) => {
        const newSize = prevSize + 1;
        setPickedPalette(colors.slice(0, newSize));
        setSelectedColors(colors.slice(0, newSize));
        setCircles(Array(newSize).fill({ x: 50, y: 50 })); 
        setRandomCircles(colors.slice(0, newSize)); 
        return newSize;
      });
    }
  };

  const decreasePaletteSize = () => {
    if (paletteSize > 2) {
      setPaletteSize((prevSize) => {
        const newSize = prevSize - 1;
        setPickedPalette(colors.slice(0, newSize));
        setSelectedColors(colors.slice(0, newSize));
        setCircles(Array(newSize).fill({ x: 50, y: 50 })); 
        setRandomCircles(colors.slice(0, newSize)); 
        return newSize;
      });
    }
  };

  const updateCirclePosition = (index, event) => {
    const newCircles = [...circles];
    const x = event.clientX - event.currentTarget.offsetLeft;
    const y = event.clientY - event.currentTarget.offsetTop;

    newCircles[index] = { x, y };
    setCircles(newCircles);
    updateCircleColor(index, x, y); 
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-5xl font-bold">Image Picker</h1>
      <p className="text-gray-500">
        Extract beautiful palettes from your photos.
      </p>

      <div className="flex flex-col-reverse md:flex-row rounded-xl md:rounded-none shadow-lg md:shadow-none w-full max-w-4xl">
        {/* Palette Picker Section */}
        <div className="flex flex-col w-full justify-between items-start space-y-4 p-4 md:w-1/3 bg-white rounded-b-xl md:rounded-b-none md:rounded-l-xl border border-r-0">
          <div className="w-full h-full flex flex-col gap-2">

            <h2 className="text-lg font-semibold">Picked Palettes</h2>
            <div className="flex flex-wrap">
              {selectedColors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full m-1 cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => toggleColorSelection(color)}
                />
              ))}
            </div>

            <h2 className="text-lg font-semibold">Palette</h2>
            <div className="flex gap-2">
              <div className="flex flex-wrap border w-full rounded-lg overflow-hidden">
                {colors.slice(0, paletteSize).map((color, index) => (
                  <div
                    key={index}
                    className={`w-12 md:w-8 md:h-8 cursor-pointer ${
                      selectedColors.includes(color)
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => toggleColorSelection(color)}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center border rounded-md">
                <button
                  onClick={decreasePaletteSize}
                  className="flex items-center justify-center border-b p-2 md:p-0"
                >
                  <FaMinus className="text-sm" />
                </button>
                {/* <span className="text-lg">{paletteSize}</span> */}
                <button
                  onClick={increasePaletteSize}
                  className="flex items-center justify-center p-2 md:p-0"
                >
                  <FaPlus className="text-sm" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="w-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex items-center justify-center w-full px-4 py-2 mt-4 text-blue-500 border rounded-md cursor-pointer hover:bg-blue-50">
                <FaImage className="mr-2" /> Browse Image
              </div>
            </label>
            <div className="flex relative">
              <button
                onClick={exportPalette}
                className="flex items-center justify-center w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-l-md hover:bg-blue-600"
              >
                <FaDownload className="mr-2" /> Export Palette
              </button>
              <button className="bg-blue-500 rounded-r-md hover:bg-blue-600 p-2 mt-2" onClick={()=>setMore(!more)}>
                <ChevronDown className="text-white" />
              </button>
              {more && (
              <div className="bg-white border p-2 rounded-lg absolute -top-48 right-0">
                
                  <ul className="flex flex-col">
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                      <span>
                        <VscWand />
                      </span>
                      <span className="text-sm font-semibold">Open in the generator</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                      <span>
                        <CiLink />
                      </span>
                      <span className="text-sm font-semibold">Copy URL</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                      <span>
                        <GoEye />
                      </span>
                      <span className="text-sm font-semibold">Quick view</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                      <span>
                        <BiFullscreen />
                      </span>
                      <span className="text-sm font-semibold">View fullscreen</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                      <span>
                        <FaRegHeart className="text-sm"/>
                      </span>
                      <span className="text-sm font-semibold">Save palette</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                      <span>
                        <RiCollageLine />
                      </span>
                      <span className="text-sm font-semibold">Create collage</span>
                    </li>
                  </ul>
                
              </div>
            )}
            </div>
            
          </div>
        </div>

        {/* Image Display Section */}
        <div className="relative w-full md:w-2/3 h-96 bg-gray-100 rounded-t-xl md:rounded-t-none md:rounded-r-xl overflow-hidden border p-4">
          {image && (
            <ColorExtractor getColors={getColors}>
              <img
                src={image}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </ColorExtractor>
          )}
          {circles.map((circle, index) => (
            <div
              key={index}
              className="absolute w-8 h-8 rounded-full border-2 border-gray-600"
              style={{
                left: circle.x,
                top: circle.y,
                backgroundColor: selectedColors[index],
                cursor: "grab",
              }}
              draggable
              onDrag={(event) => updateCirclePosition(index, event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
