import React, { useState } from 'react'

function Adjust({adjust, setAdjust}) {
    const [rangevalue, setRangeValue] = useState(0);
    const [rangevalue2, setRangeValue2] = useState(0);
    const [rangevalue3, setRangeValue3] = useState(0);
    const [rangevalue4, setRangeValue4] = useState(0);
  return (
    <div className="flex-[1.2] h-full right-0">
            <div className="w-full flex justify-center items-center border-b pb-2">
              <h1 className="text-lg font-bold">Adjust palette</h1>
            </div>
            <div className="w-full h-3/4 flex flex-col gap-7 ">
              <div className="w-full flex flex-col justify-center mt-8 items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Hue</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue}
                  </span>
                </div>
                <input
                  type="range"
                  min="-180"
                  value={rangevalue}
                  max="180"
                  onChange={(e) => setRangeValue(e.target.value)}
                  className="w-3/4"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Saturation</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue2}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  value={rangevalue2}
                  max="100"
                  className="w-3/4"
                  onChange={(e) => setRangeValue2(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Brightness</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue3}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  value={rangevalue3}
                  max="100"
                  className="w-3/4"
                  onChange={(e) => setRangeValue3(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-3/4 flex justify-between">
                  <span className=" text-sm font-bold">Temperature</span>
                  <span className="w-10 h-6 rounded-md border border-slate-500 flex justify-center items-center ">
                    {rangevalue4}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  value={rangevalue4}
                  max="100"
                  className="w-3/4"
                  onChange={(e) => setRangeValue4(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full p-2 flex justify-around items-center border-t ">
              <button
                className="w-28 h-10 rounded-md bg-gray-100 font-bold cursor-pointer"
                onClick={() => setAdjust(!adjust)}
              >
                Cancel
              </button>
              <button className="w-28 h-10 rounded-md bg-black text-white font-bold cursor-pointer">
                Apply
              </button>
            </div>
          </div>
  )
}

export default Adjust