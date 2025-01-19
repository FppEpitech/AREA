import NavbarWelcome from "../../components/Navbar/navbarWelcome";

import welcomeBackground from "../../assets/welcome/welcome_bg.png";
import welcomeLGBackground from "../../assets/welcome/welcome_lg_bg.png";
import { useNavigate } from "react-router-dom";

import check from "../../assets/icons/whiteCheck.svg";
import spotify from "../../assets/welcome/spotify.svg";
import mail from "../../assets/welcome/mail.svg";
import weather from "../../assets/welcome/weather.svg";
import clock from "../../assets/welcome/clock.svg";
import discord from "../../assets/welcome/discord.svg";
import naolib from "../../assets/welcome/naolib.svg";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-customDarkBg min-h-screen">
            <NavbarWelcome />
            <div className="grid grid-cols-1 lg:grid-cols-2 relative min-h-screen">

                {/* Background Images */}
                <img
                    src={welcomeBackground}
                    alt="Welcome background"
                    className="absolute top-0 right-0 h-screen z-0 object-cover hidden lg:flex"
                />
                <img
                    src={welcomeLGBackground}
                    alt="Welcome Background"
                    className="absolute top-0 right-0 h-screen w-full object-cover lg:hidden flex"
                />

                {/* Left Section */}
                <div className="flex flex-col justify-center items-start px-6 lg:ml-24 z-10">
                    <h1 className="bg-white dark:bg-customDarkBg dark:border-customDarkBorder 2xl:border-0 border border-customGreen rounded-[15px] p-3 text-4xl md:text-5xl lg:text-6xl font-abrilFatface text-customDarkGreen dark:text-customDarkText">
                        Plumpy
                    </h1>
                    <h2 className="bg-white dark:bg-customDarkBg dark:border-customDarkBorder 2xl:border-0 border border-customGreen rounded-[15px] p-3 mt-5 md:mt-7 lg:mt-9 text-2xl md:text-3xl lg:text-4xl text-[#9EA7A6] dark:text-gray-400 font-bold font-inter flex">
                        <div className="mr-3 bg-customLightGreen dark:bg-customDarkLightGreen rounded-[10px] w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex justify-center items-center">
                            <img
                                className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
                                src={check}
                                alt="check"
                            />
                        </div>
                        Ultimate automation tool
                    </h2>
                    <p className="bg-white dark:bg-customDarkBg dark:border-customDarkBorder 2xl:border-0 border border-customGreen rounded-[15px] p-3 mt-4 md:mt-5 text-lg md:text-xl lg:text-3xl text-[#9EA7A6] dark:text-gray-400 font-inter">
                        Offering an easy way to connect and<br />
                        automate tasks across hundreds of apps<br />
                        and services
                    </p>

                    {/* Get Started Button */}
                    <div className="flex space-x-5 mt-4">
                        <button
                            className="hover:shadow-custom bg-white dark:bg-customDarkLightGreen transition rounded-full border-2 border-customGreen dark:border-customDarkLightGreen"
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            <p className="text-lg md:text-xl font-inter px-8 md:px-10 py-2 text-customDarkGreen dark:text-customDarkText">
                                Get started
                            </p>
                        </button>
                    </div>

                    {/* Services Icons */}
                    <div className="mt-9 grid grid-cols-6 space-x-2">
                        {[spotify, mail, weather, clock, discord, naolib].map((icon, index) => (
                            <img
                                key={index}
                                className="w-[30px] h-[30px]"
                                src={icon}
                                alt="service-icon"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
