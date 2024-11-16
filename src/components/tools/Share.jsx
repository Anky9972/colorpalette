import React, { useContext } from 'react'
import { BsFiletypeSvg } from 'react-icons/bs'
import { CiImageOn, CiLink } from 'react-icons/ci'
import { FaFacebook, FaPinterest, FaRegFileCode, FaRegFilePdf, FaWhatsapp } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { ColorState } from '../../context/ColorState'
import {
    sharePalette,
    downloadPalettePDF,
    downloadPalettePNG,
    downloadPaletteSVG,
  } from "../Exports";
function Share({setShare, share, handleEmbeddbutton}) {
    const { colors } = useContext(ColorState);
  return (
    <div className="w-full h-screen z-50 left-0 top-0 flex justify-center items-center bg-slate-950 bg-opacity-40 absolute ">
            <div className=" w-full max-w-xs  mt-8 rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="w-full py-2  flex justify-center items-center border-b border-slate-150 relative">
                <span
                  className="absolute left-1 rounded-lg flex p-1 hover:bg-gray-100 justify-center items-center hover:cursor-pointer"
                  onClick={() => setShare(!share)}
                >
                  <IoCloseSharp className="text-xl"/>
                </span>
                <h1 className="font-bold">Share Palette</h1>
              </div>
              <div className="w-full h-full grid grid-cols-4 grid-rows-3 p-3 gap-2">
                <div
                  onClick={() => sharePalette(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <CiLink className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">URL</span>
                </div>
                <div
                  onClick={() => downloadPalettePDF(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <FaRegFilePdf className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">PDF</span>
                </div>
                <div
                  onClick={() => downloadPalettePNG(colors)}
                  className="w-full h-full bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <CiImageOn className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">Image</span>
                </div>
                <div
                  onClick={() => downloadPaletteSVG(colors)}
                  className="w-full h-full p-2 bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <BsFiletypeSvg className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">SVG</span>
                </div>
                <div
                  onClick={() => {
                    handleEmbeddbutton(colors)
                  }}
                  className="w-full h-full p-2 bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out"
                >
                  <span>
                    <FaRegFileCode className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">Code</span>
                </div>
                
                <div className="w-full h-full p-2 bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <span>
                    <FaWhatsapp className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">Whatsapp</span>
                </div>
                <div className="w-full h-full p-2 bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <span>
                    <FaFacebook className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">Facebook</span>
                </div>
                <div className="w-full h-full p-2 bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-3 hover:cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <span>
                    <FaPinterest className="text-xl" />
                  </span>
                  <span className="text-xs font-bold">Pinterest</span>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Share