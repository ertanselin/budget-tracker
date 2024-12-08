"use client";

import { useState } from "react";
import Image from "next/image";
import Home from "./home";
import Expenses from "./expenses";
import Incomes from "./incomes";

export default function MainComponent() {
  const [imageSrc, setImageSrc] = useState("/profile.png");
  const [selectMenu, setSelectMenu] = useState("home");

  console.log(selectMenu);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectMenu = (menu) => {
    setSelectMenu(menu);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex sm:flex-col justify-between lg:justify-start md:gap-5 lg:gap-12 p-4 lg:p-6 bg-[#1C1C1C]">
        <div className="flex flex-col justify-center items-center gap-2 lg:gap-6">
          <div className=" h-36">
            <label htmlFor="upload-button" className="cursor-pointer">
              <Image
                src={imageSrc}
                alt="Profile Picture"
                height={140}
                width={140}
                className="rounded-full object-cover h-full"
              />
            </label>
            <input
              type="file"
              id="upload-button"
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
          <p className="font-bold text-white">Selin Ertan Özbir</p>
        </div>

        <nav className="flex flex-col sm:flex-row lg:flex-col lg:gap-4 justify-between">
          <button
            className={`w-40 lg:w-48 h-10 lg:h-12 rounded-lg items-center text-start p-3 flex gap-3 font-semibold lg:text-[16px] text-sm ${
              selectMenu === "home"
                ? "bg-[#28282A] text-[#6c9ec2c1]"
                : "text-[#eff2f2]"
            }`}
            onClick={() => handleSelectMenu("home")}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={selectMenu === "home" ? "#6c9ec2" : "#eff2f2"}
                width="24px"
                height="24px"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </span>
            <span>Anasayfa</span>
          </button>

          <button
            className={`w-40 lg:w-48 h-10 lg:h-12 rounded-lg items-center text-start p-3 flex gap-3 font-semibold lg:text-[16px] text-sm ${
              selectMenu === "expenses"
                ? "bg-[#28282A] text-[#6c9ec2c1]"
                : "text-[#eff2f2]"
            }`}
            onClick={() => handleSelectMenu("expenses")}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={selectMenu === "expenses" ? "#6c9ec2" : "#eff2f2"}
                width="24px"
                height="24px"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm0 12v-8h16v8H4zm2-4h6v2H6v-2z" />
              </svg>
            </span>
            <span>Harcamalar</span>
          </button>

          <button
            className={`w-40 lg:w-48 h-10 lg:h-12 rounded-lg items-center text-start p-3 flex gap-3 font-semibold lg:text-[16px] text-sm ${
              selectMenu === "incomes"
                ? "bg-[#28282A] text-[#6c9ec2c1]"
                : "text-[#eff2f2]"
            }`}
            onClick={() => handleSelectMenu("incomes")}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={selectMenu === "incomes" ? "#6c9ec2" : "#eff2f2"}
                width="24px"
                height="24px"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm0 12v-8h16v8H4zm2-4h6v2H6v-2z" />
              </svg>
            </span>
            <span>Gelirler</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 md:m-10 lg:m-16 max-w-[1400px]">
        {selectMenu === "home" && <Home />}
        {selectMenu === "expenses" && <Expenses />}
        {selectMenu === "incomes" && <Incomes />}
      </div>
    </div>
  );
}
