import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";

interface IService {
    name: string;
    logo: string;
    description: string;
    color: string;
}

interface IPlumCard {
    logo1: string;
    logo2: string;
    service1: string;
    service2: string;
    description: string;
    numberUsers: number;
    isActivated: boolean;
}

function ServiceDetail(service: IService) {
    return (
        <div
            style={{ backgroundColor: service.color }}
            className="h-[45rem] w-full fixed top-0 left-0 z-[-1]"
        >
            <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
                <img
                    src={service.logo}
                    alt={service.name}
                    className="mb-6 w-32 h-32 object-contain"
                />
                <h2 className="text-4xl font-semibold mb-4">{service.name}</h2>
                <p className="text-xl">{service.description}</p>
            </div>
        </div>
    );
}

function PlumCard(card: IPlumCard) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
                <img src={card.logo1} alt={card.service1} className="w-12 h-12" />
                <img src={card.logo2} alt={card.service2} className="w-12 h-12" />
            </div>
            <p className="text-gray-600 text-center">{card.description}</p>
            <p className="text-sm text-gray-500">
                <strong>{card.numberUsers}</strong> Users
            </p>
            <button
                className={`py-2 px-4 text-white rounded ${
                    card.isActivated ? "bg-green-500" : "bg-gray-400"
                }`}
            >
                {card.isActivated ? "Activated" : "Deactivated"}
            </button>
        </div>
    );
}

export default function Services() {
    const { id } = useParams();

    // Sample Data for Testing
    let triggerCards: IPlumCard[] = [
        {
            logo1: "https://via.placeholder.com/50",
            logo2: "https://via.placeholder.com/50",
            service1: "Service A",
            service2: "Service B",
            description: "Trigger example between Service A and Service B.",
            numberUsers: 1200,
            isActivated: true,
        },
        {
            logo1: "https://via.placeholder.com/50",
            logo2: "https://via.placeholder.com/50",
            service1: "Service C",
            service2: "Service D",
            description: "Trigger example between Service C and Service D.",
            numberUsers: 800,
            isActivated: false,
        },
    ];

    let actionsCards: IPlumCard[] = [
        {
            logo1: "https://via.placeholder.com/50",
            logo2: "https://via.placeholder.com/50",
            service1: "Service X",
            service2: "Service Y",
            description: "Action example between Service X and Service Y.",
            numberUsers: 1500,
            isActivated: true,
        },
        {
            logo1: "https://via.placeholder.com/50",
            logo2: "https://via.placeholder.com/50",
            service1: "Service M",
            service2: "Service N",
            description: "Action example between Service M and Service N.",
            numberUsers: 500,
            isActivated: false,
        },
    ];

    const defaultService: IService = {
        name: "Discord",
        logo: "https://logo-marque.com/wp-content/uploads/2020/12/Discord-Logo.png",
        description: "A popular platform for communication and community building.",
        color: "#7289da", // Discord color
    };

    const [activeButton, setActiveButton] = useState("All");

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const filteredCards =
        activeButton === "Triggers"
            ? triggerCards
            : activeButton === "Actions"
                ? actionsCards
                : [...triggerCards, ...actionsCards];

    return (
        <div className="relative min-h-screen bg-white">
            <Navbar/>
            <ServiceDetail
                name={defaultService.name}
                logo={defaultService.logo}
                description={defaultService.description}
                color={defaultService.color}
            />
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
                        placeholder={`Search ${id || ''} triggers or actions`}
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
