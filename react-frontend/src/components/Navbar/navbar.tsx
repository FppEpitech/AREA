import { useState } from 'react';
import logo from '../../assets/logo58.png'
import user from '../../assets/navbar/user.svg'
import menu from '../../assets/navbar/menu.svg'

export default function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center py-2.5 px-3 z-50">
            {!dropdownOpen && (
            <div className="flex justify-between items-center bg-customGreen shadow-customNavbar rounded-[30px] overflow-hidden w-[1797px] h-[74px]">
                <div className='px-4'>
                    <img className='shadow-custom rounded-full' src={logo} alt="Plumpy logo"></img>
                </div>
                <div className="hidden md:flex items-center space-x-16">
                    <button type="button">
                        <p
                            className="hover:text-customOrange transition text-3xl font-abrilFatface text-customYellow text-shadow-custom">
                            Explore
                        </p>
                    </button>
                    <button type="button">
                        <p
                            className="hover:text-customOrange transition text-3xl font-abrilFatface text-customYellow text-shadow-custom">
                            My Plums
                        </p>
                    </button>
                    <div className="flex space-between space-x-5 px-6">
                        <button className="hover:bg-customOrange transition rounded-full bg-customYellow border-x-2 border-customDarkGreen shadow-custom" type="button">
                            <p
                                className='text-3xl text-customDarkGreen font-instrumentSans text-shadow-custom px-10 py-2'>
                                Create
                            </p>
                        </button>
                        <button className="hover:bg-customOrange transition rounded-full bg-customYellow border-x-2 border-customDarkGreen shadow-custom px-3 py-2 flex items-center justify-center h-14">
                            <img
                            src={user}
                            alt="userLogo"
                            className="w-8 h-8"
                            />
                        </button>
                    </div>
                </div>

                {/* Dropdown button for smaller screens */}
                <div className="md:hidden flex items-center px-6">
                    <button className="hover:bg-customOrange transition rounded-full bg-customYellow border-x-2 border-customDarkGreen shadow-custom px-3 py-2 flex items-center justify-center h-14"
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img
                        src={menu}
                        alt="menuLogo"
                        className="w-8 h-8"
                        />
                    </button>
                </div>
            </div>)}

            {dropdownOpen && (
            <div className="bg-customGreen shadow-customNavbar rounded-lg rounded-[30px] overflow-hidden w-full h-auto">

                <div className='flex justify-between px-4 py-4'>
                    <img className='shadow-custom rounded-full' src={logo} alt="Plumpy logo"></img>
                    <div className="flex items-center">
                        <button
                            className="hover:bg-customOrange transition rounded-full bg-customYellow border-x-2 border-customDarkGreen shadow-custom px-3 py-2 flex items-center justify-center h-14"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img
                                src={menu}
                                alt="menuLogo"
                                className="w-8 h-8"
                            />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 px-4 pb-4">
                    <button type="button" className="w-full">
                        <p className="hover:text-customOrange transition text-3xl font-abrilFatface text-customYellow text-shadow-custom">
                            Explore
                        </p>
                    </button>
                    <button type="button" className="w-full">
                        <p className="hover:text-customOrange transition text-3xl font-abrilFatface text-customYellow text-shadow-custom">
                            My Plums
                        </p>
                    </button>
                    <button className="w-full hover:bg-customOrange transition rounded-full bg-customYellow border-x-2 border-customDarkGreen shadow-custom px-10 py-2">
                        <p className="text-3xl text-customDarkGreen font-instrumentSans text-shadow-custom">
                            Create
                        </p>
                    </button>
                    <button className="w-full hover:bg-customOrange transition rounded-full bg-customYellow border-x-2 border-customDarkGreen shadow-custom px-3 py-2 flex items-center justify-center h-14">
                        <img
                            src={user}
                            alt="userLogo"
                            className="w-8 h-8"
                        />
                    </button>
                </div>
            </div>
        )}
        </div>
    );
}
