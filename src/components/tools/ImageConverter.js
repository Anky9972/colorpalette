import React, { useState, useRef } from "react";
import axios from "axios";
import { IoImagesOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { GoArrowRight, GoArrowUp } from "react-icons/go";

const ImageConverter = () => {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("png");
  const [convertedImages, setConvertedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false); // Added for download feedback
  const inputRef = useRef(null);

  // Handle file upload (drag-and-drop or file input)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.filter(
      (file) => !files.some((f) => f.name === file.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.filter(
      (file) => !files.some((f) => f.name === file.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleConvert = async () => {
    if (files.length === 0) return alert("Please upload at least one image");
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("format", format);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/convert",
        formData
      );
      setConvertedImages(response.data.convertedFiles);
    } catch (error) {
      alert("Error during conversion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/download-all', {
        responseType: 'blob',
      });

      const blob = response.data;
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'converted-images.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert("Error downloading the ZIP file. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center gap-10 p-10">
      <div className=" text-center flex flex-col items-center gap-10">
        <h2 className="text-5xl font-bold">Image Converter</h2>
        <p className="text-gray-500">Convert your images easily.</p>
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />
      {files.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`h-60 lg:w-1/2 p-4 border-2 border-dashed rounded-xl cursor-pointer ${
            dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
        >
          <div className="text-gray-500 text-center w-full h-full bg-gray-50 rounded-lg flex flex-col justify-center items-center gap-5">
            <IoImagesOutline className="text-5xl text-black" />
            <p className="text-sm">
              Drag & drop images here, or click to select files
            </p>
          </div>
        </div>
      )}

      {convertedImages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Converted Images:</h3>
          <button
            onClick={handleDownloadAll}
            className="text-blue-600 underline"
            disabled={downloading}
          >
            {downloading ? "Downloading..." : "Download All"}
          </button>
          <div className="mt-4">
            {convertedImages.map((img, index) => (
              <div key={index} className="mt-4 flex flex-col items-start gap-2">
                <a
                  href={img.convertedPath}
                  download
                  className="text-blue-600 underline"
                >
                  {img.originalName} - Download
                </a>
                <img
                  src={img.convertedPath}
                  alt={img.originalName}
                  className="mt-2 w-32 h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full bg-white">
        {files.length > 0 && (
          <div className="max-w-2xl mx-auto border rounded-xl">
            <div className="p-4 flex flex-col gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between bg-gray-100 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <IoImagesOutline className="text-md text-gray-700" />
                    <span className="text-sm font-semibold">{file.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(file.name)}
                    className="p-1 border rounded-lg bg-white"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-between items-center border-t p-4">
              <button
                onClick={handleClick}
                className="text-black font-semibold text-sm px-3 py-2 border rounded-lg flex justify-center items-center gap-2"
              >
                Add more images
                <GoArrowUp className="text-xl font-semibold" />
              </button>
              {files.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm">Convert to</span>
                  <select
                    value={format}
                    onChange={handleFormatChange}
                    className="p-2 border rounded-lg bg-white text-sm"
                  >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="webp">WEBP</option>
                    <option value="tiff">TIFF</option>
                  </select>
                  <button
                    onClick={handleConvert}
                    className="bg-black text-white py-2 px-4 rounded-lg flex justify-center items-center gap-2 text-sm"
                    disabled={loading}
                  >
                    {loading ? "Converting..." : "Convert"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;
