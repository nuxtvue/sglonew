import React, { memo } from "react";
import { FaOdnoklassnikiSquare, FaVk } from "react-icons/fa";

const Footer = memo(() => (
  <div className="bg-blue-400/40 p-4 shadow-md container mx-auto rounded-md flex justify-between items-center">
    <div>{new Date().getFullYear()} - Союз Женщин Липецкой области</div>
    <div className="flex flex-col items-center gap-4">
      <h3 className="font-semibold">Наши соцсети:</h3>
      <div className="flex gap-4">
        <FaVk className="text-3xl hover:text-blue-600 text-gray-700" />
        <FaOdnoklassnikiSquare className="text-3xl hover:text-orange-600 text-gray-700" />
      </div>
    </div>
  </div>
));

export default Footer;
