import { useState } from "react";

interface IService {
    name: string;
    logo: string;
}

export default function ExploreContent() {

    const [services, setServices] = useState<IService[]>([
        {
            name: "Discord",
            logo: "https://logo-marque.com/wp-content/uploads/2020/12/Discord-Logo.png"
        }
    ]);

    return (
        <div className="mx-6 sm:mx-10 md:mx-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-11">
            {services.map((service, index) => (
                <button
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white h-72 w-full max-w-sm font-instrumentSans border border-gray-200 rounded-lg shadow-custom hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                <img
                    src={service.logo}
                    alt={service.name}
                    className="w-24 h-24 rounded-full object-contain mb-4"
                />
                <h5 className="text-2xl font-bold text-customDarkGreen tracking-tight dark:text-white text-center">
                    {service.name}
                </h5>
                </button>
            ))}
        </div>
    );
}
