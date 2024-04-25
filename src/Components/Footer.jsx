import React from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="w-full h-80 bg-COLOR-CV-292F36 flex justify-center items-center">
      <div className="bg-COLOR-CV-F2F4F3 w-100 h-0.5 mr-4 relative bottom-20"></div>

      <div className="flex flex-col items-center" style={{ width: "50rem" }}>
        <div className="flex space-x-4">
          <div className="border-r border-gray-500 pr-4">
            <FaFacebook className="text-COLOR-CV-F2F4F3 text-4xl"/>
          </div>
          <div className="border-r border-gray-500 pr-4">
            <AiFillTwitterCircle className="text-COLOR-CV-F2F4F3 text-4xl"/>
          </div>
          <div className="border-r border-gray-500 pr-4">
            <FaYoutube className="text-COLOR-CV-F2F4F3 text-4xl"/>
          </div>
          <RiInstagramFill className="text-COLOR-CV-F2F4F3 text-4xl"/>
        </div>

        <div className="mt-10">
          <p className="text-center text-COLOR-CV-595959 text-2xl font-medium">
            Astillero
          </p>
          <br />
          <p className="text-COLOR-CV-F2F4F3">Copyright 20224 - titulo.com</p>
        </div>

        <div className="mt-5 flex space-x-4">
          <p className="text-COLOR-CV-F2F4F3">Informaion Legal</p>
          <p className="text-COLOR-CV-F2F4F3">Politica de la Privacidad</p>
        </div>
      </div>

      <div className=" bg-COLOR-CV-F2F4F3 w-100 h-0.5 ml-4 relative bottom-20"></div>
    </div>
  );
};

export default Footer;
