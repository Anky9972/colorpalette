import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Modal from 'react-modal';

const ImageModal = ({ onClose, onImageSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onImageSelect(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen onRequestClose={onClose} ariaHideApp={false} className=" bg-black h-full bg-opacity-45 flex justify-center items-center">
      <div className="bg-white rounded-xl">
        <div className='w-full flex justify-center items-center relative border-b'>
        <span
              className="absolute left-1 top-1 p-1 cursor-pointer "
              onClick={onClose}
            >
              <IoCloseSharp />
            </span>

        <h2 className="text-sm font-bold p-2">Select Image</h2>

        </div>
        <div className='border-b'>
            <ul className=' w-full text-sm flex p-2 justify-center items-center gap-5'>
                <li>Upload</li>
                <li>URL</li>
                <li>Camera</li>
                <li>Stock</li>
            </ul>
        </div>
        <div className='w-full p-4'>
            <div className='h-40 w-full border border-dashed border-gray-500 rounded-xl flex justify-center items-center'>
          <input type="file" onChange={handleFileChange} className="" />
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
