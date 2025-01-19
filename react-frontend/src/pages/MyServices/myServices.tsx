import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/navbar"
import { deleteToken, getServices, getServicesWithTokens } from "../../services/Providers/providers";

import trashSvg from '../../assets/icons/trash.svg';
import { Oauth2Log } from "../../services/OAuth2/oauth2";

interface Service {
    id: string;
    provider: string;
    logo: string;
    color: string;
    authRoute: string;
}

export default function MyServices() {

    const [services, setServices] = useState<Service[]>([]);
    const [servicesWithTokens, setServicesWithTokens] = useState<Service[]>([]);
    const [tokens, setTokens] = useState<any[]>([]);

    const fetchServices = async () => {
        const servicesTokenData = await getServicesWithTokens();
        const servicesData = await getServices();
        setTokens(servicesTokenData);
        const tokenProviders = servicesTokenData.map((token : any) => token.provider);

        setServicesWithTokens(servicesData.filter((service : Service) => (tokenProviders.includes(service.provider)) ));
        setServices(servicesData.filter((service : Service) => (service.authRoute && !tokenProviders.includes(service.provider)) ));
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const connectToService = async (authRoute: string) => {
        Oauth2Log(authRoute);
        fetchServices();
    }

    const deleteTokenService = async (name: string) => {
        const id = tokens.find((token : any) => token.provider === name).id;
        if (id) {
            await deleteToken(id);
            fetchServices();
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="mt-36 w-5/6 mx-auto">
                <h1 className="text-4xl font-abrilFatface text-customGreen mb-6">Services</h1>

                {services && services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-4 mb-4 rounded-full shadow-custom border">
                        <div className="flex items-center">
                            <img src={service.logo} alt="logo" className="w-10 h-10 mx-4" />
                            <p>{service.provider}</p>
                        </div>
                        <div className="flex items-center mx-5">
                            <button
                                className="bg-customGreen text-white px-4 py-2 rounded-full"
                                onClick={() => connectToService(service.authRoute)}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                ))}
                {servicesWithTokens && servicesWithTokens.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-4 mb-4 rounded-full shadow-custom border">
                        <div className="flex items-center">
                            <img src={service.logo} alt="logo" className="w-10 h-10 mx-4" />
                            <p>{service.provider}</p>
                            <p>(Connected)</p>
                        </div>
                        <div className="flex items-center mx-5">
                            <button
                                type="button"
                                onClick={() => deleteTokenService(service.provider)}
                            >
                                <img
                                    src={trashSvg}
                                    alt="trash"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};
