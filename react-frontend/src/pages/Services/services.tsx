import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import { getProvidersActions, getProvidersTriggers } from "../../services/Plums/plums";

import clockSvg from "../../assets/icons/clock.svg";
import tvSvg from "../../assets/icons/tv.svg";
import plus from "../../assets/icons/plus.svg";
import { getServices } from "../../services/Providers/providers";

interface ValueTemplate {
    [key: string]: {
        type: string;
        value: string;
    };
}

interface IService {
    name: string;
    logo: string;
    description: string;
    color: string;
    provider: string;
}

interface ITriggerActionCard {
    isTrigger: boolean;
    name: string;
    valueTemplate?: ValueTemplate;
    provider: string;
}

export interface Trigger {
    id: number;
    name: string;
    provider: string;
    type: string;
    valueTemplate: ValueTemplate;
}

export interface Action extends Trigger {}

function PlumCard(card: ITriggerActionCard) {
    const navigate = useNavigate();

    const createPlumWithCard = (card: ITriggerActionCard) => {
        if (card.isTrigger) {
            navigate('/create', { state: { givenTrigger: card } });
        } else {
            navigate('/create', { state: { givenAction: card } });
        }
    };

    return (
        <div className="bg-white border-2 border-customLightGreen rounded-lg p-6 flex flex-col dark:bg-customDarkCard dark:border-customDarkBorder">
            <div className="flex">
                <img
                    src={card.isTrigger ? clockSvg : tvSvg}
                    alt="plus"
                    className="mr-[9px]"
                />
                <span className="text-base font-bold font-inter dark:text-white">
                    {card.isTrigger ? "Trigger" : "Action"}
                </span>
            </div>
            <p className="font-bold font-inter text-2xl mt-4 dark:text-white">{card.name}</p>
            {card.valueTemplate ? (
                <div className="mt-4 text-left w-full">
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        {Object.keys(card.valueTemplate).join(", ")}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No fields available</p>
            )}
            <button
                className="mt-16 flex justify-center max-w-[160px] text-xl dark:bg-customDarkDarkGreen dark:text-white hover:bg-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen dark:border-customGreen dark:hover:bg-customDarkGreen dark:hover:text-white"
                type="button"
                onClick={() => createPlumWithCard(card)}
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

export default function Services() {
    const {id} = useParams<{ id: string }>();
    const [service, setService] = useState<IService | null>(null);
    const [triggers, setTriggers] = useState<ITriggerActionCard[]>([]);
    const [actions, setActions] = useState<ITriggerActionCard[]>([]);
    const [activeButton, setActiveButton] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch service data
        const fetchService = async () => {
            try {
                const services = await getServices();
                const selectedService = services.find((s: IService) => s.name === id);
                setService(selectedService || null);
            } catch (error) {
                console.error("Error fetching service:", error);
            }
        };
        fetchService();
    }, [id]);

    useEffect(() => {
        const fetchTemplates = async () => {
            if (!service) return; // Ensure service is loaded
            try {
                const actionResponse = await getProvidersActions(service.provider);
                const triggerResponse = await getProvidersTriggers(service.provider);

                if (actionResponse) {
                    setActions(
                        actionResponse.map((template: any) => ({
                            isTrigger: false,
                            name: template.name,
                            keywords: template.keywords,
                            valueTemplate: template.valueTemplate, // Include valueTemplate
                            provider: service.provider,
                        }))
                    );
                }

                if (triggerResponse) {
                    setTriggers(
                        triggerResponse.map((template: any) => ({
                            isTrigger: true,
                            name: template.name,
                            valueTemplate: template.valueTemplate,
                            provider: service.provider,
                        }))
                    );
                }
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };
        fetchTemplates();
    }, [service]);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const filteredCards =
        (activeButton === "Triggers" ? triggers
            : activeButton === "Actions" ? actions
                : [...triggers, ...actions])
            .filter((card) => {
                const lowerCaseQuery = searchQuery.toLowerCase();
                return (
                    card.name.toLowerCase().includes(lowerCaseQuery)
                );
            });

    if (!service) return <div>Loading...</div>;

    return (
        <div className="relative min-h-screen bg-white dark:bg-customDarkBg">
            <Navbar />
            <div
                style={{ backgroundColor: service.color }}
                className="h-[45rem] w-full fixed top-0 left-0 z-[-1]"
            >
                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                    <img
                        src={service.logo}
                        alt={service.provider}
                        className="mb-6 w-32 h-32 object-contain"
                    />
                    <h2 className="text-4xl font-semibold mb-4">{service.provider}</h2>
                    <p className="text-xl">{service.description}</p>
                </div>
            </div>
            <div className="relative z-10 container mx-auto p-4 mt-[45rem]">
                {/* Filter Section */}
                <div className="flex flex-col items-center py-8">
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`text-customGreen font-medium pb-1 ${
                                activeButton === "All" ? "border-b-2 border-customGreen" : ""
                            } dark:text-white dark:border-customDarkGreen`}
                            onClick={() => handleButtonClick("All")}
                        >
                            All
                        </button>
                        <button
                            className={`text-customGreen font-medium pb-1 ${
                                activeButton === "Triggers" ? "border-b-2 border-customGreen" : ""
                            } dark:text-white dark:border-customDarkGreen`}
                            onClick={() => handleButtonClick("Triggers")}
                        >
                            Triggers
                        </button>
                        <button
                            className={`text-customGreen font-medium pb-1 ${
                                activeButton === "Actions" ? "border-b-2 border-customGreen" : ""
                            } dark:text-white dark:border-customDarkGreen`}
                            onClick={() => handleButtonClick("Actions")}
                        >
                            Actions
                        </button>
                    </div>
                    <input
                        type="search"
                        placeholder={`Search ${id || ""} triggers or actions`}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen dark:bg-customDarkCard dark:text-white dark:border-customDarkBorder"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Display Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mt-4">
                    {filteredCards.map((card, index) => (
                        <PlumCard key={index} {...card} provider={service.provider} />
                    ))}
                </div>
            </div>
        </div>
    );
}
