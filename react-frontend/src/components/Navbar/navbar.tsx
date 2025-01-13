import { useState } from 'react';
import logo from '../../assets/logo58.png'
import setting from '../../assets/icons/settings.svg'
import box from '../../assets/icons/box.svg'
import compas from '../../assets/icons/compas.svg'
import plus from '../../assets/icons/plus.svg'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center py-2.5 px-3 z-50">
            {!dropdownOpen && (
            <div className="flex justify-between items-center rounded-[30px] overflow-hidden w-full h-[74px]">
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
                    <div className="flex space-between space-x-5 px-6">
                        <button className="hover:bg-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen"
                            type="button"
                            onClick={() => navigate('/create')}>

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
                        <button className="transition rounded-full px-3 py-2 flex items-center justify-center h-14">
                            <img
                            src={setting}
                            alt="setting"
                            className="w-8 h-8"
                            />
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
                    <button type="button" className="w-full">
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
                    <button className="w-full hover:bg-gray-100 transition rounded-full border-2 border-customLightGreen hover:shadow-custom px-10 py-2"
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
                    <button className="w-full transition rounded-full border-2 border-customLightGreen hover:bg-gray-100 hover:shadow-custom px-3 py-2 flex items-center justify-center h-14">
                        <img
                            src={setting}
                            alt="setting"
                            className="w-8 h-8"
                        />
                    </button>
                </div>
            </div>
        )}
        </div>
    );
}
