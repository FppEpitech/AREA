import { useState } from 'react';
import logo from '../../assets/logo58.png'
import { useNavigate } from 'react-router-dom';

import setting from '../../assets/icons/settings.svg'
import phone from '../../assets/icons/whitePhone.svg'
import blackPhone from '../../assets/icons/phone.svg'
import user from '../../assets/icons/whiteUser.svg'
import blackuser from '../../assets/icons/blackUser.svg'
import { useIsMobile } from '../IsMobile/isMobile';

export default function NavbarWelcome() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center py-2.5 px-3 z-50">
            {!dropdownOpen && (
            <div className="flex justify-between items-center rounded-[30px] overflow-hidden w-full h-[74px]">
                <button type="button"
                    onClick={() => navigate('/welcome')}>
                    <div className='px-4'>
                        <img className='shadow-custom rounded-full' src={logo} alt="Plumpy logo"
                        onClick={() => navigate('/welcome')}
                        ></img>
                    </div>
                </button>
                <div className="hidden md:flex items-center space-x-[45px]">
                    <button type="button"
                        onClick={() => navigate('/contact')}>
                        <p
                            className="flex transition text-xl lg:text-white font-inter hover:text-shadow-custom">
                            {!isMobile && (<img
                                src={phone}
                                alt="phone"
                                className="w-[24px] h-[24px] mr-[9px]"
                            />)}
                            {isMobile && (<img
                                src={blackPhone}
                                alt="blackPhone"
                                className="w-[24px] h-[24px] mr-[9px]"
                            />)}
                            Contact
                        </p>
                    </button>
                    <button type="button"
                        onClick={() => navigate('/login')}>
                        <p
                            className="flex transition text-xl lg:text-white font-inter hover:text-shadow-custom">
                            {!isMobile && (<img
                                src={user}
                                alt="user"
                                className="w-[24px] h-[24px] mr-[9px]"
                            />)}
                            {isMobile && (<img
                                src={blackuser}
                                alt="blackuser"
                                className="w-[24px] h-[24px] mr-[9px]"
                            />)}
                            Login
                        </p>
                    </button>
                    <div className="flex space-between space-x-5 px-6">
                        <button className="hover:shadow-custom transition rounded-full border-2 border-customLightGreen"
                            type="button"
                            onClick={() => navigate('/signup')}>

                            <p
                                className='flex text-xl lg:text-white font-inter px-10 py-2'>
                                Register
                            </p>
                        </button>
                    </div>
                </div>

                {/* Dropdown button for smaller screens */}
                <div className="md:hidden flex items-center">
                    <button className="hover:text-gray-100 transition rounded-full px-3 py-2 flex items-center justify-center h-14"
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img
                        src={setting}
                        alt="setting"
                        className="w-8 h-8"
                        />
                    </button>
                </div>
            </div>)}

            {dropdownOpen && (
            <div className="shadow-customNavbar bg-white rounded-lg rounded-[30px] overflow-hidden w-full h-auto">

                <div className='flex justify-between px-4 py-4'>
                    <img className='shadow-custom rounded-full' src={logo} alt="Plumpy logo"></img>
                    <div className="flex items-center">
                        <button
                            className="transition rounded-full px-3 py-2 flex items-center justify-center h-14"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img
                                src={setting}
                                alt="setting"
                                className="w-8 h-8"
                            />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 px-4 pb-4">
                    <button type="button" className="w-full"
                        onClick={() => navigate('/contact')}>
                        <p className="flex justify-center transition text-xl font-inter hover:text-shadow-custom">
                            <img
                                src={blackPhone}
                                alt="phone"
                                className="w-[24px] h-[24px] mr-[9px]"
                            />
                            Contact
                        </p>
                    </button>
                    <button type="button" className="w-full"
                        onClick={() => navigate('/login')}>
                        <p className="flex justify-center transition text-xl font-inter hover:text-shadow-custom">
                            <img
                                src={blackuser}
                                alt="blackuser"
                                className="w-[24px] h-[24px] mr-[9px]"
                            />
                            Login
                        </p>
                    </button>
                    <button className="w-full hover:bg-gray-100 transition rounded-full border-2 border-customLightGreen hover:shadow-custom px-10 py-2"
                        onClick={() => navigate('/signup')}>
                        <p className="flex justify-center text-xl font-inter">
                            Register
                        </p>
                    </button>
                </div>
            </div>
        )}
        </div>
    );
}
