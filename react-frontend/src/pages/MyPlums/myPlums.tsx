import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import feather from '../../assets/myPlums/feather.svg';
import filter from '../../assets/myPlums/filter.svg';
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import { getPlums } from "../../services/Plums/plums";

interface Template {
    provider: string;
}

interface TriggerPlum {
    name: string;
    triggerTemplate: Template;
}

interface ActionPlum {
    name: string;
    actionTemplate: Template;
}

export interface Plum {
    name: string;
    provider: string;
    isActivated: boolean;
    trigger: TriggerPlum;
    action: ActionPlum;
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

    useEffect(() => {
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
        };
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

    return (
        <div>
            <Navbar />
            <div className="mt-36 w-5/6 mx-auto">
                <h1 className="text-3xl font-bold mb-6">My Plums</h1>
                <div className="flex justify-start mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="search"
                            placeholder="Search"
                            onChange={handleChange}
                            value={searchInput}
                            className="block w-full p-4 ps-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-transparent"
                        />
                    </div>
                    <button
                        className="bg-customGreen hover:bg-customDarkGreen text-white font-bold m-2 py-2 px-4 rounded-lg flex justify-center"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <img className="w-5 mx-3" src={filter} alt="Filter" />
                    </button>
                    <button
                        className="bg-customGreen hover:bg-customDarkGreen text-white font-bold m-2 py-2 px-4 rounded-lg"
                        onClick={() => navigate('/create')}
                    >
                        Create
                    </button>
                </div>
                {filterOpen && <Filter myPlums={myPlums} filterPlums={filterPlums} services={provider} filterByServices={filterByServices}/>}
                <div className="flex justify-center">
                    <div className="relative overflow-x-auto w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Apps
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {myPlums.map((plum, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white dark:bg-gray-800 border-b"
                                        onClick={() => {}}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <div className="flex justify-start">
                                                <img
                                                    className="w-5 mx-3"
                                                    src={feather}
                                                    alt="Feather"
                                                />
                                                {plum.name}
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{plum.provider}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className={`relative w-14 h-8 flex items-center rounded-full p-1 ${
                                                    plum.isActivated
                                                        ? 'bg-customGreen'
                                                        : 'bg-gray-300'
                                                } transition-colors duration-300`}
                                            >
                                                <div
                                                    className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
                                                        plum.isActivated
                                                            ? 'translate-x-6'
                                                            : 'translate-x-0'
                                                    } transition-transform duration-300`}
                                                ></div>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
