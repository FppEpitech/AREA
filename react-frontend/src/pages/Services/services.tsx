import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import {getProvidersActions, getProvidersTriggers} from "../../services/Plums/plums";

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
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
                <span className="text-sm text-gray-500">
                    {card.isTrigger ? "Trigger" : "Action"}
                </span>
            </div>
            <p className="text-gray-600 text-center">{card.name}</p>
            {card.valueTemplate ? (
                <div className="mt-4 text-left w-full">
                    <p className="text-sm text-gray-600">
                        {Object.keys(card.valueTemplate).join(", ")}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-500">No fields available</p>
            )}

            {/* Connect Button */}
            <button
                className="bg-customGreen text-white px-4 py-2 rounded-md hover:bg-customGreenDark transition duration-200"
                onClick={() => console.log(`Connect button clicked for ${card.name}`)}
            >
                Connect
            </button>
        </div>
    );
}

export default function Services() {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<IService | null>(null);
    const [triggers, setTriggers] = useState<ITriggerActionCard[]>([]);
    const [actions, setActions] = useState<ITriggerActionCard[]>([]);
    const [activeButton, setActiveButton] = useState("All");

    useEffect(() => {
        // Fetch service data
        const fetchService = async () => {
            try {
                const response = await fetch(`/services`);
                const services = await response.json();
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
                        }))
                    );
                }

                if (triggerResponse) {
                    setTriggers(
                        triggerResponse.map((template: any) => ({
                            isTrigger: true,
                            name: template.name,
                            valueTemplate: template.valueTemplate,
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
        activeButton === "Triggers"
            ? triggers
            : activeButton === "Actions"
                ? actions
                : [...triggers, ...actions];

    if (!service) return <div>Loading...</div>;

    return (
        <div className="relative min-h-screen bg-white">
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
                            }`}
                            onClick={() => handleButtonClick("All")}
                        >
                            All
                        </button>
                        <button
                            className={`text-customGreen font-medium pb-1 ${
                                activeButton === "Triggers" ? "border-b-2 border-customGreen" : ""
                            }`}
                            onClick={() => handleButtonClick("Triggers")}
                        >
                            Triggers
                        </button>
                        <button
                            className={`text-customGreen font-medium pb-1 ${
                                activeButton === "Actions" ? "border-b-2 border-customGreen" : ""
                            }`}
                            onClick={() => handleButtonClick("Actions")}
                        >
                            Actions
                        </button>
                    </div>
                    <input
                        type="search"
                        placeholder={`Search ${id || ""} triggers or actions`}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-customGreen"
                    />
                </div>

                {/* Display Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {filteredCards.map((card, index) => (
                        <PlumCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </div>
    );
}
