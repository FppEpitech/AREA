import { useState, useEffect, useRef } from "react";
import { Plum } from "../../pages/MyPlums/myPlums";

export default function ServiceDrop({ myPlums, services, filterByServices }: {
    myPlums: Plum[];
    services: string[];
    filterByServices: (selectedServices: string[]) => void;
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleServiceChange = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    useEffect(() => {
        filterByServices(selectedServices);
    }, [selectedServices]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative m-2" ref={dropdownRef}>
            <button
                id="dropdownCheckboxButton"
                onClick={toggleDropdown}
                className="text-customGreen shadow-custom bg-customYellow hover:bg-customOrange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Services
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            <div
                id="dropdownDefaultCheckbox"
                className={`absolute z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                } w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
                <ul
                    className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownCheckboxButton"
                >
                    {services.map((service) => (
                        <li key={service}>
                            <div className="flex items-center">
                                <input
                                    id={`checkbox-${service}`}
                                    type="checkbox"
                                    checked={selectedServices.includes(service)}
                                    onChange={() => handleServiceChange(service)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor={`checkbox-${service}`}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {service}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
