import ExploreContent from "../../components/Explore/ExploreContent";
import ExploreNavbar from "../../components/Explore/ExploreNavbar";
import Navbar from "../../components/Navbar/navbar";

interface IService {
    name: string;
    logo: string;
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

function ServiceCard (service : IService) {
    return(
        <div>
            <img src={ service.logo } alt={ service.name } ></img>
            <p>{ service.name }</p>
        </div>
    );
}

export default function Explore () {

    let plumCards: IPlumCard[] = []; // TODO: Fill this list with Plum cards of the db
    let ServiceCards: IService[] = []; // TODO: Fill this list with Service cards of the db

    return (
        <div>
            <Navbar></Navbar>
            <ExploreNavbar />
            <ExploreContent />
            {
                ServiceCards.map((card, index) => (
                    <ServiceCard key={index} {...card} />
                ))
            }
            {
                plumCards.map((card, index) => (
                    <PlumCard key={index} {...card} />
                ))
            }
        </div>
    );
}
