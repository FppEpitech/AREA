import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import { deletePlum, getPlums } from "../../services/Plums/plums";
import Footer from "../../components/Footer/Footer";

import searchSvg from '../../assets/icons/search.svg';
import filterSvg from '../../assets/icons/filter.svg';
import plusSvg from '../../assets/icons/plus.svg';
import feather from '../../assets/icons/feather.svg';
import dots from '../../assets/icons/dots.svg';
import trash from '../../assets/icons/trash.svg';

interface Template {
    provider: string;
    name: string;
}

interface TriggerPlum {
    name: string;
    triggerTemplate: Template;
    triggerValue: any;
}

interface ActionPlum {
    name: string;
    actionTemplate: Template;
    actionValue: any;
}

export interface Plum {
    name: string;
    provider: string;
    isActivated: boolean;
    trigger: TriggerPlum;
    action: ActionPlum;
    id: number;
}

export default function MyPlums() {
    const navigate = useNavigate();

    const [originalPlums, setOriginalPlums] = useState<Plum[]>([]);
    const [provider] = useState<string[]>([]);
    const [myPlums, setMyPlums] = useState<Plum[]>([]);

    const [searchInput, setSearchInput] = useState('');
    const [currentStatusFilter, setCurrentStatusFilter] = useState<'All' | 'On' | 'Off'>('All');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);

    const fetchPlums = async () => {
        try {
            const plums = await getPlums();
            if (plums) {
                plums.forEach((plum: Plum) => {
                    plum.provider = plum.trigger.triggerTemplate.provider + ', ' + plum.action.actionTemplate.provider;
                    if (!provider.includes(plum.trigger.triggerTemplate.provider)) {
                        provider.push(plum.trigger.triggerTemplate.provider);
                    }
                    if (!provider.includes(plum.action.actionTemplate.provider)) {
                        provider.push(plum.action.actionTemplate.provider);
                    }
                });

                setOriginalPlums(plums);
                setMyPlums(plums);
            }
        } catch (error) {
            console.error("Error fetching plums:", error);
        }
    }

    useEffect(() => {
        fetchPlums();
    }, []);

    const applyFilters = () => {
        let filtered = [...originalPlums];

        if (searchInput) {
            filtered = filtered.filter((plum) => plum.name.toLowerCase().includes(searchInput.toLowerCase()));
        }

        if (currentStatusFilter !== 'All') {
            const isActivated = currentStatusFilter === 'On';
            filtered = filtered.filter((plum) => plum.isActivated === isActivated);
        }

        if (selectedServices.length > 0) {
            filtered = filtered.filter((plum) =>
                selectedServices.some((service) => plum.provider.split(', ').includes(service))
            );
        }

        setMyPlums(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [searchInput, currentStatusFilter, selectedServices]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const filterPlums = (filterType: 'All' | 'On' | 'Off') => {
        setCurrentStatusFilter(filterType);
    };

    const filterByServices = (provider: string[]) => {
        setSelectedServices(provider);
    };

    const goToCreate = (plum: Plum) => {
        navigate('/create', { state: { plum } });
    };

    const eventDeletePlum = async (plum: Plum) => {
        try {
            await deletePlum(plum.id);
            fetchPlums();
        } catch (error) {
            console.error("Error deleting plum:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-customLightBlue dark:bg-customDarkBg">
            <Navbar />
            <div className="mt-36 w-5/6 mx-auto">
                <h1 className="text-4xl font-abrilFatface text-customGreen dark:text-customDarkGreen mb-6">Plums</h1>
                <div className="flex flex-wrap items-center mb-4 space-x-4 space-y-4 md:space-y-0 md:justify-start md:flex-nowrap">
                    <div className="flex items-center w-full md:w-auto">
                        <img
                            src={searchSvg}
                            alt="search"
                            className="mr-[9px]"
                        />
                        <input
                            type="search"
                            id="search"
                            placeholder="Search"
                            className="block w-full md:w-[404px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-customGreen focus:border-customGreen dark:bg-customDarkCard dark:text-customDarkText dark:border-customDarkBorder"
                            value={searchInput}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Filter button */}
                    <button
                        className="md:w-[160px] h-[32px] hover:bg-gray-100 dark:hover:bg-customDarkCard transition rounded-full border-2 border-customLightGreen dark:border-customDarkGreen hover:shadow-custom px-4 md:px-10 py-2 flex items-center justify-center"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <p className="flex justify-center text-sm md:text-xl font-inter text-customGreen dark:text-customDarkText">
                            <img
                                src={filterSvg}
                                alt="filter"
                                className="mr-[9px]"
                            />
                            Filter
                        </p>
                    </button>
                    {/* Create button */}
                    <button
                        type="button"
                        className="md:w-auto flex items-center justify-center hover:bg-gray-100 dark:bg-customDarkGreen dark:hover:bg-customDarkDarkGreen dark:text-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen dark:border-customGreen px-4 md:px-10 py-2"
                        onClick={() => navigate('/create')}
                    >
                        <p className="flex justify-center transition text-sm md:text-xl font-inter text-customGreen dark:text-customDarkText">
                            <img
                                src={plusSvg}
                                alt="plus"
                                className="mr-[9px]"
                            />
                            Create
                        </p>
                    </button>
                </div>

                {filterOpen && <Filter myPlums={myPlums} filterPlums={filterPlums} services={provider} filterByServices={filterByServices} />}
                <div className="flex justify-center mt-4">
                    <div className="relative overflow-x-auto w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 text-inter bg-gray-100 dark:bg-customDarkCard dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Services</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">
                                    <img src={dots} alt="dots" />
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {myPlums.map((plum, index) => (
                                <tr key={index} className="bg-white dark:bg-customDarkCard border-b dark:border-customDarkBorder">
                                    <th scope="row" className="px-6 py-4 font-semibold font-inter text-[#464E5F] whitespace-nowrap dark:text-white">
                                        <div className="flex justify-start items-center space-x-6 hover:underline" onClick={() => { goToCreate(plum); }}>
                                            <div className="bg-customLightGreen rounded-[6px] w-[50px] h-[50px] flex justify-center">
                                                <img className="w-[24px] h-[24px] mt-[13px]" src={feather} alt="Feather" />
                                            </div>
                                            <div>{plum.name}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 dark:text-customDarkText">{plum.provider}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            aria-label="Activate"
                                            className={`relative w-20 h-8 flex items-center rounded-full p-1 ${plum.isActivated ? 'bg-customLightGreen' : 'bg-gray-300 dark:bg-customDarkCard'} transition-colors duration-300`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform ${plum.isActivated ? 'translate-x-12' : 'translate-x-0'} transition-transform duration-300`}></div>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button type="button" onClick={() => { eventDeletePlum(plum); }}>
                                            <img src={trash} alt="trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
