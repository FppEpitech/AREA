import { Plum } from "../../pages/MyPlums/myPlums";
import ServiceDrop from "./ServiceDrop";
import StatusDrop from "./StatusDrop";

export default function Filter({
    myPlums,
    filterPlums,
    services,
    filterByServices,
}: {
    myPlums: Plum[];
    filterPlums: (filterType: 'All' | 'On' | 'Off') => void;
    services: string[];
    filterByServices: (selectedServices: string[]) => void;
}) {
    return (
        <div className="flex space-x-6">
            <StatusDrop myPlums={myPlums} filterPlums={filterPlums} />
            <ServiceDrop myPlums={myPlums} services={services} filterByServices={filterByServices} />
        </div>
    );
}
