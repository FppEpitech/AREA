import { useState, useEffect, useRef } from "react";
import { Plum } from "../../pages/MyPlums/myPlums";
import checkSvg from '../../assets/icons/check.svg';
import arrowDownSvg from '../../assets/icons/arrowDown.svg';

export default function StatusDrop({ myPlums, filterPlums }: { myPlums: Plum[]; filterPlums: (filterType: 'All' | 'On' | 'Off') => void; }) {
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
                <p className="flex items-center text-sm md:text-xl font-inter">
                    <img
                        src={checkSvg}
                        alt="check"
                        className="w-[24px] h-[24px] mr-[9px]"
                    />
                    Status
                    <img
                        src={arrowDownSvg}
                        alt="arrow-down"
                        className="w-[24px] h-[24px] ml-[9px]"
                    />
                </p>
            </button>
            <div
                id="dropdownDivider"
                style={{ left: '-100px' }}
                className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white dark:bg-customDarkGreen divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-44`}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    <li>
                        <button
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => filterPlums('All')}
                        >
                            All
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => filterPlums('On')}
                        >
                            On
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => filterPlums('Off')}
                        >
                            Off
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
