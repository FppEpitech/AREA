import React, { useEffect, useState } from "react";
import ExploreNavbar from "../../components/Explore/ExploreNavbar";
import Navbar from "../../components/Navbar/navbar";
import { getActions, getTriggers } from "../../services/Plums/plums";

interface IService {
    name: string;
    logo: string;
    color: string; // Add color to match the service style
}

interface IPlumCard {
    name: string;
    isTrigger: boolean;
    valueTemplate?: { [key: string]: any };
    provider: string;
}

function ServiceCard({ name, logo, color }: IService) {
    return (
        <div
            style={{ backgroundColor: color }}
            className="flex items-center justify-center text-center text-white h-64 rounded-lg p-6"
        >
            <div>
                <img
                    src={logo}
                    alt={name}
                    className="mx-auto w-20 h-20 object-contain mb-4"
                />
                <p className="text-xl font-bold">{name}</p>
            </div>
        </div>
    );
}

function PlumCard({ name, isTrigger, valueTemplate, provider }: IPlumCard) {
    return (
        <div className="bg-white border-2 border-customLightGreen rounded-lg p-6 flex flex-col">
            <div className="flex">
                <img
                    src={isTrigger ? "/path-to-trigger-icon.svg" : "/path-to-action-icon.svg"}
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
            <button className="mt-16 flex justify-center max-w-[160px] text-xl hover:bg-gray-100 hover:shadow-custom transition rounded-full border-2 border-customLightGreen"
                    type="button"
            >
                <p className="flex text-xl font-inter m-2">
                    <img
                        src="/path-to-plus-icon.svg"
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

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("/services");
                const data = await response.json();
                setServices(
                    data.map((service: any) => ({
                        name: service.name,
                        logo: service.logo,
                        color: service.color,
                    }))
                );
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        const fetchPlumCards = async () => {
            try {
                const actions = await getActions();
                const triggers = await getTriggers();
                const combinedCards = [...actions, ...triggers].map((item: any) => ({
                    name: item.name,
                    isTrigger: item.type === "trigger",
                    valueTemplate: item.valueTemplate,
                    provider: item.provider,
                }));
                setPlumCards(combinedCards);
            } catch (error) {
                console.error("Error fetching actions/triggers:", error);
            }
        };

        fetchServices();
        fetchPlumCards();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <ExploreNavbar />
            <div className="container mx-auto p-4">
                {/* Services Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>

                {/* Actions and Triggers Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">Actions & Triggers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plumCards.map((card, index) => (
                            <PlumCard key={index} {...card} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
