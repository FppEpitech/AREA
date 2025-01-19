import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo58.png'
import burger from '../../assets/icons/settings.svg'
import setting from '../../assets/icons/setting.svg'
import box from '../../assets/icons/box.svg'
import compas from '../../assets/icons/compas.svg'
import plus from '../../assets/icons/plus.svg'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth';
import service from '../../assets/icons/service.svg'

function SettingButton() {

    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                id="dropdownDividerButton"
                onClick={toggleDropdown}
                className="px-3 py-2 flex items-center justify-center rounded-full
               border-2 border-customLightGreen dark:border-customGreen dark:bg-customDarkGreen dark:hover:bg-customDarkDarkGreen
               transition-colors duration-300"
                type="button"
            >
                <img
                    id='dropdownDividerButton'
                    src={setting}
                    alt="setting"
                    className="w-8 h-8"
                />
            </button>
            <div
                id="dropdownDivider"
                style={{left: '-100px'}}
                className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white dark:bg-customDarkGreen divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-44`}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    <li>
                        <button
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => logout(navigate)}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed bg-white dark:text-gray-200 dark:bg-customDarkCard dark:border-customDarkCard border-b top-0 left-0 right-0 flex justify-center px-3 z-50">
            {!dropdownOpen && (
                <div className="flex justify-between items-center w-full h-[74px]">
                    <button type="button"
                            onClick={() => navigate('/explore')}>
                        <div className='px-4'>
                            <img className='shadow-custom rounded-full' src={logo} alt="Plumpy logo"
                                 onClick={() => navigate('/explore')}
                            ></img>
                        </div>
                    </button>
                    <div className="hidden md:flex items-center space-x-[45px]">
                        <button type="button"
                                onClick={() => navigate('/explore')}>
                            <p
                                className="flex transition text-xl font-inter hover:text-shadow-custom">
                                <img
                                    src={compas}
                                    alt="compas"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                Explore
                            </p>
                        </button>
                        <button type="button"
                                onClick={() => navigate('/myPlums')}>
                            <p
                                className="flex transition text-xl font-inter hover:text-shadow-custom">
                                <img
                                    src={box}
                                    alt="box"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                My Plums
                            </p>
                        </button>
                        <button type="button"
                                onClick={() => navigate('/myServices')}>
                            <p
                                className="flex transition text-xl font-inter hover:text-shadow-custom">
                                <img
                                    src={service}
                                    alt="service"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                My Services
                            </p>
                        </button>
                        <div className="flex space-between space-x-5 px-6">
                            <button
                                className="hover:bg-gray-100 dark:bg-customDarkGreen dark:hover:bg-customDarkDarkGreen dark:text-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen dark:border-customGreen"
                                type="button" onClick={() => navigate('/create')}>
                                <p
                                    className='flex text-xl font-inter px-10 py-2'>
                                    <img
                                        src={plus}
                                        alt="plus"
                                        className="w-[24px] h-[24px] mr-[9px]"
                                    />
                                    Create
                                </p>
                            </button>
                            <SettingButton/>
                        </div>
                    </div>

                    {/* Dropdown button for smaller screens */}
                    <div className="md:hidden flex items-center">
                        <button className="hover:text-gray-100 transition rounded-full px-3 py-2 flex items-center justify-center h-14"
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img
                                src={burger}
                                alt="burger"
                                className="w-8 h-8"
                            />
                        </button>
                    </div>
                </div>)}

            {dropdownOpen && (
                <div className="shadow-customNavbar dark:bg-customDarkCard bg-white rounded-lg rounded-[30px] w-full h-auto">

                    <div className='flex justify-between px-4 py-4'>
                        <img className='shadow-custom rounded-full' src={logo} alt="Plumpy logo"></img>
                        <div className="flex items-center">
                            <button
                                className="transition rounded-full px-3 py-2 flex items-center justify-center h-14"
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img
                                    src={burger}
                                    alt="burger"
                                    className="w-8 h-8"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 px-4 pb-4">
                        <button type="button" className="w-full"
                                onClick={() => navigate('/explore')}>
                            <p className="flex justify-center transition text-xl font-inter hover:text-shadow-custom">
                                <img
                                    src={compas}
                                    alt="compas"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                Explore
                            </p>
                        </button>
                        <button type="button" className="w-full"
                                onClick={() => navigate('/myPlums')}>
                            <p className="flex justify-center transition text-xl font-inter hover:text-shadow-custom">
                                <img
                                    src={box}
                                    alt="box"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                My Plums
                            </p>
                        </button>
                        <button type="button" className="w-full"
                                onClick={() => navigate('/myServices')}>
                            <p className="flex justify-center transition text-xl font-inter hover:text-shadow-custom">
                                <img
                                    src={service}
                                    alt="service"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                My Services
                            </p>
                        </button>
                        <button className="hover:bg-gray-100 dark:bg-customDarkGreen dark:hover:bg-customDarkDarkGreen dark:text-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen dark:border-customGreen"
                            onClick={() => navigate('/create')}>
                            <p className="flex justify-center text-xl font-inter">
                                <img
                                    src={plus}
                                    alt="plus"
                                    className="w-[24px] h-[24px] mr-[9px]"
                                />
                                Create
                            </p>
                        </button>
                        <div className="flex justify-center">
                            <SettingButton />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}