import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreNavbar from "../../components/Explore/ExploreNavbar";
import Navbar from "../../components/Navbar/navbar";
import { getActions, getTriggers } from "../../services/Plums/plums";
import Footer from "../../components/Footer/Footer";


import plus from "../../assets/icons/plus.svg";
import clockSvg from "../../assets/icons/clock.svg";
import tvSvg from "../../assets/icons/tv.svg";

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

interface IService {
    name: string;
    logo: string;
    color: string;
}

interface IPlumCard {
    name: string;
    isTrigger: boolean;
    valueTemplate?: { [key: string]: any };
    provider: string;
    type: "trigger" | "action";
}

function ServiceCard({ name, logo, color }: IService) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/services/${name}`);
    };

    return (
        <button
            onClick={handleClick}
            style={{ backgroundColor: color }}
            className="flex items-center justify-center text-center text-white h-64 rounded-lg p-6 transition-transform hover:scale-105"
        >
            <div>
                <img
                    src={logo}
                    alt={name}
                    className="mx-auto w-20 h-20 object-contain mb-4"
                />
                <p className="text-xl font-bold">{name}</p>
            </div>
        </button>
    );
}

function PlumCard({ name, isTrigger, valueTemplate, provider }: IPlumCard) {
    const navigate = useNavigate();

    const createPlum = () => {
        navigate("/create", {
            state: isTrigger
                ? { givenTrigger: { name, valueTemplate, provider } }
                : { givenAction: { name, valueTemplate, provider } },
        });
    };

    return (
        <div className="bg-white border-2 border-customLightGreen rounded-lg p-6 flex flex-col">
            <div className="flex">
                <img
                    src={isTrigger ? clockSvg : tvSvg}
                    alt={isTrigger ? "Trigger" : "Action"}
                    className="mr-[9px]"
                />
                <span className="text-base font-bold font-inter">
                    {isTrigger ? "Trigger" : "Action"}
                </span>
            </div>
            <p className="font-bold font-inter text-2xl mt-4">{name}</p>
            {valueTemplate ? (
                <div className="mt-4 text-left w-full">
                    <p className="text-base text-gray-600">
                        {Object.keys(valueTemplate).join(", ")}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-500">No fields available</p>
            )}
            <button
                className="mt-16 flex justify-center max-w-[160px] text-xl hover:bg-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen"
                type="button"
                onClick={createPlum}
            >
                <p className="flex text-xl font-inter m-2">
                    <img
                        src={plus}
                        alt="plus"
                        className="w-[24px] h-[24px] mr-2"
                    />
                    Use it
                </p>
            </button>
        </div>
    );
}

export default function Explore() {
    const [services, setServices] = useState<IService[]>([]);
    const [plumCards, setPlumCards] = useState<IPlumCard[]>([]);
    const [allItems, setAllItems] = useState<any[]>([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("/services");
                const data = await response.json();
                const servicesData = data.map((service: any) => ({
                    name: service.name,
                    logo: service.logo,
                    color: service.color,
                }));
                setServices(servicesData);
                return servicesData;
            } catch (error) {
                console.error("Error fetching services:", error);
                return [];
            }
        };

        const fetchPlumCards = async () => {
            try {
                const actions = await getActions();
                const triggers = await getTriggers();

                const formattedActions = actions.map((item: any) => ({
                    name: item.name,
                    isTrigger: false,
                    valueTemplate: item.valueTemplate,
                    provider: item.provider,
                    type: "action",
                } as IPlumCard));

                const formattedTriggers = triggers.map((item: any) => ({
                    name: item.name,
                    isTrigger: true,
                    valueTemplate: item.valueTemplate,
                    provider: item.provider,
                    type: "trigger",
                } as IPlumCard));

                const combinedCards = [...formattedActions, ...formattedTriggers];
                const shuffledCards = combinedCards.sort(() => Math.random() - 0.5); // Shuffle the cards
                setPlumCards(shuffledCards);

                return shuffledCards;
            } catch (error) {
                console.error("Error fetching actions/triggers:", error);
                return [];
            }
        };

        const fetchAllItems = async () => {
            const servicesData = await fetchServices();
            const plumCardsData = await fetchPlumCards();
            setAllItems(shuffleArray([...servicesData, ...plumCardsData]));
        };

        fetchAllItems();
    }, []);

    const filteredItems = allItems.filter((item) => {
        const itemName = item.name.toLowerCase();
        const matchesSearch = itemName.includes(searchQuery.toLowerCase());

        if (activeFilter === "All") {
            return matchesSearch;
        } else if (activeFilter === "Services") {
            return "logo" in item && matchesSearch; // Filter only services
        } else if (activeFilter === "Triggers & Actions") {
            return "type" in item && matchesSearch; // Filter only plum cards
        }
        return false;
    });

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <ExploreNavbar />
            <div className="container mx-auto p-4">
                {/* Filter Buttons */}
                <div className="flex justify-center space-x-6 mb-8">
                    <button
                        className={`text-xl font-semibold ${
                            activeFilter === "All"
                                ? "text-customGreen border-b-2 border-customGreen"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveFilter("All")}
                    >
                        All
                    </button>
                    <button
                        className={`text-xl font-semibold ${
                            activeFilter === "Services"
                                ? "text-customGreen border-b-2 border-customGreen"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveFilter("Services")}
                    >
                        Services
                    </button>
                    <button
                        className={`text-xl font-semibold ${
                            activeFilter === "Triggers & Actions"
                                ? "text-customGreen border-b-2 border-customGreen"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveFilter("Triggers & Actions")}
                    >
                        Triggers & Actions
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="search"
                        placeholder="Search by name..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-customLightBlue" w-full>
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredItems.map((item, index) =>
                            "type" in item ? (
                                <PlumCard key={index} {...item} />
                            ) : (
                                <ServiceCard key={index} {...item} />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
