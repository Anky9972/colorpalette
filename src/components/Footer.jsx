import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-100 p-5 md:p-10">
      <div className="container mx-auto mg:px-6 lg:px-20">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full flex flex-col">
            <h3 className="font-bold text-lg mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="/generate" className="hover:underline hover:text-black hover:font-bold">Generate your palettes</a></li>
              <li><a href="/explore" className="hover:underline hover:text-black hover:font-bold">Explore popular palettes</a></li>
              <li><a href="/image-picker" className="hover:underline hover:text-black hover:font-bold">Extract palette from image</a></li>
              <li><a href="/contrast-checker" className="hover:underline hover:text-black hover:font-bold">Contrast checker</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Preview palettes on designs</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Recolor your own design</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Color picker</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">More</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="/colors" className="hover:underline hover:text-black hover:font-bold">List of colors </a></li>
              <li><a href="/gradients" className="hover:underline hover:text-black hover:font-bold">Browse gradients</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Create a gradient</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Make a gradient palette</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Image converter</a></li>
              <li><a href="/upcoming" className="hover:underline hover:text-black hover:font-bold">Create a collage</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:underline hover:text-black hover:font-bold">Terms of service</a></li>
              <li><a href="#" className="hover:underline hover:text-black hover:font-bold">Privacy policy</a></li>
              <li><a href="#" className="hover:underline hover:text-black hover:font-bold">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="w-full mt-5 border-t"></div>
        <div className="mt-5 flex flex-col lg:flex-row items-center justify-between text-gray-500 text-sm">
          <p className="mb-4 lg:mb-0">&copy; Palettes. Bringing color and creativity to the world.</p>
          <div>
            <ul className="flex justify-center items-center gap-5 text-black">
                <li>
                    <span>
                        <FaXTwitter/>
                    </span>
                </li>
                <li>
                    <span>
                        <FaFacebookF/>
                    </span>
                </li>
                <li>
                    <span>
                        <FaInstagram/>
                    </span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
