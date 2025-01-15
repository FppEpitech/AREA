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
                className="flex transition text-xl font-inter hover:text-shadow-custom"
                type="button"
            >
                <p className="flex justify-center text-sm md:text-xl font-inter">
                    <img
                        src={checkSvg}
                        alt="plus"
                        className="mr-[9px]"
                    />
                    Status
                    <img
                        src={arrowDownSvg}
                        alt="plus"
                        className="ml-[9px]"
                    />
                </p>
            </button>
            <div
                id="dropdownDivider"
                className={`absolute z-10 ${
                    isDropdownOpen ? 'block' : 'hidden'
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
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
