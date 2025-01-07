import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import ExploreContent from "../../components/Explore/ExploreContent";

interface IService {
    name: string;
    logo: string;
    description: string;
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
        <div>
            <img src={service.logo} alt={service.name} width="100" />
            <p><strong>Name:</strong> {service.name}</p>
            <p><strong>Description:</strong> {service.description}</p>
        </div>
    );
}

function PlumCard (card: IPlumCard) {
    return(
        <div>
            <img src={ card.logo1 } alt={ card.service1 } ></img>
            <img src={ card.logo2 } alt={ card.service2 } ></img>
            <p>{ card.description }</p>
            <p>{ card.numberUsers }</p>
        </div>
    );
}

export default function Services() {
    const { id } = useParams();

    let triggerCards: IPlumCard[] = []; // TODO: Fill this list with trigger cards of the db
    let actionsCards: IPlumCard[] = []; // TODO: Fill this list with Actions cards of the db

    // Default service details
    const defaultService: IService = {
        name: "Discord",
        logo: "",
        description: "A popular platform for communication and community building.",
    };
    // <Navbar />
    return (
        <div>
            <h1>{id?.toUpperCase()}</h1>
            {/* Render default service */}
            <ServiceDetail
                name={defaultService.name}
                logo={defaultService.logo}
                description={defaultService.description}
            />
            <ExploreContent />
            {
                triggerCards.map((card, index) => (
                    <PlumCard key={index} {...card} />
                ))
            }
            {
                actionsCards.map((card, index) => (
                    <PlumCard key={index} {...card} />
                ))
            }
        </div>
    );
}
